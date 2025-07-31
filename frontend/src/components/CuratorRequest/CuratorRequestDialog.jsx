import React, { useState, useRef } from 'react';
import {
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { createCuratorRequest } from '../../api/CuratorRequestApi';
import {
  StyledDialog,
  FormContent,
  FileUploadBox,
  FilePreview,
  FileChip
} from './CuratorRequestDialog.styles';

const CuratorRequestDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    message: '',
    cv_url: '',
    additional_files: []
  });
  const [files, setFiles] = useState({
    cv: null,
    additional: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const cvInputRef = useRef();
  const additionalFilesRef = useRef();

  const handleFileUpload = async (file, folder) => {
    try {
      const storageRef = ref(storage, `curator-requests/${folder}/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('File upload failed:', error);
      throw new Error('File upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let cv_url = '';
      let additional_files = [];

      if (files.cv) {
        cv_url = await handleFileUpload(files.cv, 'cv');
      }

      if (files.additional.length > 0) {
        const uploadPromises = files.additional.map(file => 
          handleFileUpload(file, 'additional')
        );
        additional_files = await Promise.all(uploadPromises);
      }

      await createCuratorRequest({
        message: formData.message,
        cv_url,
        additional_files
      });

      setSuccess('Your curator request has been submitted successfully!');
      setTimeout(() => {
        onClose();
        setFormData({ message: '', cv_url: '', additional_files: [] });
        setFiles({ cv: null, additional: [] });
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        setError('CV file size should not exceed 5MB');
        return;
      }
      setFiles(prev => ({ ...prev, cv: file }));
    }
  };

  const handleAdditionalFilesUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const oversizedFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
    
    if (oversizedFiles.length > 0) {
      setError('Each additional file should not exceed 5MB');
      return;
    }

    if (newFiles.length + files.additional.length > 5) {
      setError('Maximum 5 additional files allowed');
      return;
    }

    setFiles(prev => ({
      ...prev,
      additional: [...prev.additional, ...newFiles]
    }));
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Become a Curator</DialogTitle>
      <form onSubmit={handleSubmit}>
        <FormContent>
          <Typography variant="body2" color="textSecondary">
            Please provide your information to apply for a curator position.
            <br />
            Maximum file size: 5MB
          </Typography>
          
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField
            label="Message"
            multiline
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            fullWidth
          />
          
          <input
            type="file"
            ref={cvInputRef}
            style={{ display: 'none' }}
            onChange={handleCVUpload}
            accept=".pdf,.doc,.docx"
          />
          
          <FileUploadBox onClick={() => cvInputRef.current.click()}>
            <CloudUploadIcon sx={{ fontSize: 40, color: '#8D5524' }} />
            <Typography>
              {files.cv ? files.cv.name : 'Click to upload your CV (PDF, DOC, DOCX)'}
            </Typography>
          </FileUploadBox>

          <input
            type="file"
            multiple
            ref={additionalFilesRef}
            style={{ display: 'none' }}
            onChange={handleAdditionalFilesUpload}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          
          <FileUploadBox onClick={() => additionalFilesRef.current.click()}>
            <CloudUploadIcon sx={{ fontSize: 40, color: '#8D5524' }} />
            <Typography>
              Upload additional files (optional, max 5 files)
            </Typography>
            {files.additional.length > 0 && (
              <FilePreview>
                {files.additional.map((file, index) => (
                  <FileChip key={index}>
                    {file.name}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiles(prev => ({
                          ...prev,
                          additional: prev.additional.filter((_, i) => i !== index)
                        }));
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </FileChip>
                ))}
              </FilePreview>
            )}
          </FileUploadBox>
        </FormContent>
        
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading || !formData.message || !files.cv}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default CuratorRequestDialog;