import { useState, useEffect } from "react";
import { Typography, TextField, CardContent, Input, CircularProgress } from "@mui/material";
import { Sort, AddCircle, Cancel } from "@mui/icons-material";
import { storage } from "../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  getAllConditionReports,
  createConditionReport,
  getReportsByPaintingId
} from "../../../api/ConditionReportApi";
import {
  StyledReportContainer,
  StyledReportHeader,
  StyledActionButtons,
  StyledAddForm,
  StyledSortButton,
  StyledAddButton,
  StyledUploadButton,
  StyledSaveButton,
  StyledCardGrid,
  StyledReportCard,
  StyledCardText,
  StyledDateText,
  StyledRemoveButton,
  StyledImageBox,
  StyledImage,
  StyledImageContainer,
  ReportWrapper,
  EmptyStateContainer,
  StyledReportSection
} from "./ConditionReport.styles";
import ImageCarousel from "./ImageCarousel";
import PropTypes from 'prop-types';

const ConditionReport = ({ iscurator, isOpen, paintingId }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    images: [],
    painting_id: paintingId
  });

  useEffect(() => {
    console.log("ConditionReport mounted with paintingId:", paintingId);
    if (paintingId) {
      fetchReports();
    }
  }, [paintingId]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const fetchedReports = await getReportsByPaintingId(paintingId);
      console.log("Fetched reports:", fetchedReports);
      setReports(fetchedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `condition-reports/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const uploadPromises = newReport.images.map(image => 
        uploadImageToFirebase(image)
      );
      
      const uploadedImageUrls = await Promise.all(uploadPromises);
      
      const reportData = {
        title: newReport.title,
        description: newReport.description,
        images: uploadedImageUrls,
        painting_id: paintingId
      };

      const createdReport = await createConditionReport(reportData);
      
      setReports(prev => [...prev, createdReport]);
      setShowAddForm(false);
      setNewReport({
        title: "",
        description: "",
        images: [],
        painting_id: paintingId
      });
    } catch (error) {
      console.error("Error creating report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "latest" ? "earliest" : "latest");
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setNewReport(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewReport(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const sortedReports = [...reports].sort((a, b) =>
    sortOrder === "latest"
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at)
  );

  return (
    <ReportWrapper isOpen={isOpen}>
      <StyledReportContainer>
        <StyledReportHeader>
          Condition Reports
        </StyledReportHeader>
        
        <StyledActionButtons>
          {reports.length > 0 && (
            <StyledSortButton startIcon={<Sort />} onClick={handleSortChange}>
              Sort by {sortOrder === "latest" ? "Earliest" : "Latest"}
            </StyledSortButton>
          )}
          {iscurator && (
            <StyledAddButton
              onClick={() => setShowAddForm(!showAddForm)}
              isCancel={showAddForm}
              aria-expanded={showAddForm}
            >
              {showAddForm ? <Cancel /> : <AddCircle />}
              {showAddForm ? "Cancel" : "Add Report"}
            </StyledAddButton>
          )}
        </StyledActionButtons>

        {iscurator && showAddForm && (
          <StyledAddForm
            component="form"
            onSubmit={handleAddReport}
          >
            <TextField
              label="Title"
              fullWidth
              value={newReport.title}
              onChange={(e) =>
                setNewReport({ ...newReport, title: e.target.value })
              }
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newReport.description}
              onChange={(e) =>
                setNewReport({ ...newReport, description: e.target.value })
              }
              required
            />
            <Input
              type="file"
              id="report-image-upload"
              slotProps={{
                input: { multiple: true, accept: "image/*" },
              }}
              onChange={handleImageUpload}
              sx={{ display: "none" }}
            />
            <StyledUploadButton component="label" htmlFor="report-image-upload">
              Upload Images
            </StyledUploadButton>
            {newReport.images.length > 0 && (
              <StyledImageContainer>
                {newReport.images.map((image, index) => (
                  <StyledImageBox key={index}>
                    <StyledImage
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt={`preview-${index}`}
                      onLoad={(e) => {
                        if (typeof image !== "string")
                          URL.revokeObjectURL(e.target.src);
                      }}
                    />
                    <StyledRemoveButton
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </StyledRemoveButton>
                  </StyledImageBox>
                ))}
              </StyledImageContainer>
            )}
            <StyledSaveButton type="submit">Save Report</StyledSaveButton>
          </StyledAddForm>
        )}

        <StyledReportSection>
          <StyledCardGrid>
            {loading ? (
              <CircularProgress />
            ) : reports.length === 0 ? (
              <EmptyStateContainer>
                <Typography variant="h6" color="textSecondary">
                  No Condition Reports Available
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {iscurator 
                    ? "Click the 'Add Report' button to create the first condition report."
                    : "No condition reports have been created for this artwork yet."}
                </Typography>
              </EmptyStateContainer>
            ) : (
              sortedReports.map((report) => (
                <StyledReportCard key={report.id || report.title}>
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {report.title}
                    </Typography>
                    <StyledCardText>{report.description}</StyledCardText>
                    <StyledDateText variant="body2">
                      {new Date(report.created_at).toLocaleDateString()}
                    </StyledDateText>

                    {report.images && report.images.length > 0 && (
                      <ImageCarousel
                        images={report.images.map((img) =>
                          typeof img === "string" ? img : URL.createObjectURL(img)
                        )}
                      />
                    )}
                  </CardContent>
                </StyledReportCard>
              ))
            )}
          </StyledCardGrid>
        </StyledReportSection>
      </StyledReportContainer>
    </ReportWrapper>
  );
};

ConditionReport.propTypes = {
  iscurator: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  paintingId: PropTypes.number.isRequired
};

export default ConditionReport;
