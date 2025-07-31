import React from "react";
import UserManagement from "../../components/UserManagement/UserManagement";
import { PageContainer, ContentContainer } from "./UserManagementPage.styles";

const UserManagementPage = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <UserManagement />
      </ContentContainer>
    </PageContainer>
  );
};

export default UserManagementPage;
