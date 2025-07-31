import React from "react";
import ArtworkForm from "../../components/ArtworkForm/ArtworkForm";
import { PageContainer, ContentContainer, FormWrapper } from "./ArtworkFormPage.styles";

const ArtworkFormPage = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <FormWrapper>
          <ArtworkForm />
        </FormWrapper>
      </ContentContainer>
    </PageContainer>
  );
};

export default ArtworkFormPage;
