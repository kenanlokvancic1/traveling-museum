import React from "react";
import { ManagePaintingsTable } from "../../components/ManagePaintingsTable";
import { PageContainer, ContentContainer, AddButton } from "./ManagePaintingsPage.styles";
import { AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ManagePaintingsPage = () => {
    const navigate = useNavigate();

    const handleAddPaintingClick = () => {
      navigate("/artwork-form");
    };

    return (
      <PageContainer>
        <ContentContainer>
          <ManagePaintingsTable />
          <AddButton
            variant="contained"
            startIcon={<AddCircle />}
            onClick={handleAddPaintingClick}
          >
            Add New Painting
          </AddButton>
        </ContentContainer>
      </PageContainer>
    );
  };

export default ManagePaintingsPage;