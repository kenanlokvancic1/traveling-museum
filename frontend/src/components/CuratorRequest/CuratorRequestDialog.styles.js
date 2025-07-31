import { styled } from '@mui/material/styles';
import { Box, Dialog, DialogContent } from '@mui/material';

export const StyledDialog = styled(Dialog)({
  '& .MuiDialogTitle-root': {
    backgroundColor: '#8D5524',
    color: '#ffffff',
    padding: '16px 24px',
  },
  '& .MuiDialogContent-root': {
    padding: '24px',
  }
});

export const FormContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const FileUploadBox = styled(Box)({
  border: '2px dashed #8D5524',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(141, 85, 36, 0.04)',
  }
});

export const FilePreview = styled(Box)({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '8px'
});

export const FileChip = styled(Box)({
  backgroundColor: '#8D5524',
  color: '#ffffff',
  padding: '4px 8px',
  borderRadius: '16px',
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
});