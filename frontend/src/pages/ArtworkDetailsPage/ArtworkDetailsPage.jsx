import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArtworkDetails from "../../components/ArtworkDetails/ArtworkDetails";
import Footer from "../../components/Footer/Footer";

import {
  PageContainer,
  ContentWrapper,
  MessageContainer,
  MessageText,
  FooterWrapper,
} from "./ArtworkDetailsPage.styles";

import { fetchArtworkDetails } from "./artworkHelpers";

const ArtworkDetailsPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const iscurator = user && (user.role === "curator" || user.role === "admin");
  const isLoggedIn = !!user;

  useEffect(() => {
    const getArtworkData = async () => {
      try {
        setLoading(true);
        const data = await fetchArtworkDetails(id);
        setArtwork(data);
      } catch (err) {
        console.error("Failed to fetch artwork:", err);
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getArtworkData();
    } else {
      setArtwork(null);
      setLoading(false);
    }
  }, [id]);

  const handleArtworkUpdate = (updatedArtwork) => {
    setArtwork(updatedArtwork);
  };

  if (loading)
    return (
      <MessageContainer>
        <MessageText>Loading artwork details...</MessageText>
      </MessageContainer>
    );

  if (!artwork)
    return (
      <MessageContainer>
        <MessageText>Sorry, this page doesn't exist</MessageText>
      </MessageContainer>
    );

  return (
    <>
      <PageContainer iscurator={iscurator}>
        <ContentWrapper iscurator={iscurator}>
          <ArtworkDetails
            artwork={artwork}
            artist={artwork.artist}
            iscurator={iscurator}
            isLoggedIn={isLoggedIn}
            onArtworkUpdate={handleArtworkUpdate}
          />
        </ContentWrapper>
      </PageContainer>

      {!iscurator && (
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )}
    </>
  );
};

export default ArtworkDetailsPage;
