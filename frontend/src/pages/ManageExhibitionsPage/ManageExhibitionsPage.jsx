import React from "react";
import { ManageExhibitionsTable } from "../../components/ManageExhibitionsTable";
import { PageContainer, ContentContainer, AddButton } from "./ManageExhibitionsPage.styles";
import { AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ManageExhibitionsPage = () => {
    const navigate = useNavigate();
  
    const handleAddExhibitionClick = () => {
      navigate("/exhibition-form");
    };
  
    return (
      <PageContainer>
        <ContentContainer>
          <ManageExhibitionsTable />
          <AddButton
            variant="contained"
            startIcon={<AddCircle />}
            onClick={handleAddExhibitionClick}
          >
            Add New Exhibition
          </AddButton>
        </ContentContainer>
      </PageContainer>
    );
  };

export default ManageExhibitionsPage;