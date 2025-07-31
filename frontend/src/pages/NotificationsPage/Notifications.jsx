import React from "react";
import { NotificationsList } from "../../components/NotificationsList";
import { PageContainer, ContentWrapper } from "./NotificationsPage.styles";

const NotificationsPage = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <NotificationsList />
      </ContentWrapper>
    </PageContainer>
  );
};

export default NotificationsPage;
