import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArtistDetails from "../../components/ArtistDetails/ArtistDetails";
import Footer from "../../components/Footer/Footer";
import {
  PageWrapper,
  PageContainer,
  ContentWrapper,
} from "./ArtistDetailsPage.styles";

import { getArtistById } from "../../api/ArtistApi"; 
import { getUserRoles } from "./artistDetailsPageHelper"; 

const ArtistDetailsPage = () => {
  const { id } = useParams(); 
  const user = useSelector((state) => state.user.user);
  const { isCurator, isLoggedIn } = getUserRoles(user);

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data = await getArtistById(id);
        setArtist(data);
      } catch (error) {
        console.error("Failed to fetch artist:", error);
        setArtist(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtist();
    }
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <PageContainer>
          <ContentWrapper>
            <p>Loading artist details...</p>
          </ContentWrapper>
        </PageContainer>
      </PageWrapper>
    );
  }

  if (!artist) {
    return (
      <PageWrapper>
        <PageContainer>
          <ContentWrapper>
            <p>Artist not found.</p>
          </ContentWrapper>
        </PageContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageContainer isCurator={isCurator}>
        <ContentWrapper isCurator={isCurator}>
          <ArtistDetails
            artist={artist}
            isCurator={isCurator}
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
      </PageContainer>
      {!isCurator && <Footer />}
    </PageWrapper>
  );
};

export default ArtistDetailsPage;
