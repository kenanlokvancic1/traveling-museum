import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme, useMediaQuery, CssBaseline } from "@mui/material";
import ExhibitionCard from "../../components/Exhibitions/ExhibitionCard";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import AboutUs from "../../components/AboutUs/About";
import {
  HomePageContainer,
  CarouselContainer,
  ExhibitionsSection,
  ExhibitionsTitle,
  CardGridContainer,
  CardGrid,
  MobileCarouselWrapper,
  MobileCarouselScrollBox,
  MobileCarouselItem,
  AboutSectionDivider,
  StyledGridItem,
} from "./Home.styles";
import { getExhibitionsByTimeframe } from "../../api/ExhibitionApi";
import {
  mapExhibitionsData,
  filterExhibitions,
  getPaginatedExhibitions,
  getPageCount,
} from "../../pages/Exhibitions/exhibitionsHelper";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentExhibitions, setCurrentExhibitions] = useState([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const carouselImages = [
    "/src/assets/images/carousel.webp",
    "/src/assets/images/car1.jpg",
    "/src/assets/images/museum.jpeg",
    "/src/assets/images/museum1.jpg",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExhibitionsByTimeframe();
        const mappedData = await mapExhibitionsData(data);
        setCurrentExhibitions(mappedData);
      } catch (error) {
        console.error("Failed to fetch exhibitions:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updatedExhibitions = filterExhibitions(
      currentExhibitions,
      "current",
      searchTerm,
      "recent"
    );
    setFilteredExhibitions(updatedExhibitions);
  }, [currentExhibitions, searchTerm]);

  const totalExhibitions = filteredExhibitions.length;
  const exhibitionsToDisplay = getPaginatedExhibitions(
    filteredExhibitions,
    currentPage,
    itemsPerPage
  );
  const pageCount = getPageCount(totalExhibitions, itemsPerPage);

  return (
    <HomePageContainer>
      <CssBaseline />
      <CarouselContainer>
        <Carousel images={carouselImages} />
      </CarouselContainer>

      <ExhibitionsSection>
        <ExhibitionsTitle variant="h4" component="h2">
          Our Exhibitions
        </ExhibitionsTitle>

        {isMobile ? (
          <MobileCarouselWrapper>
            <MobileCarouselScrollBox>
              {exhibitionsToDisplay.map((exhibition) => (
                <MobileCarouselItem key={exhibition.id}>
                  <Link to={`/exhibitions/${exhibition.id}`}>
                    <ExhibitionCard exhibition={exhibition} />
                  </Link>
                </MobileCarouselItem>
              ))}
            </MobileCarouselScrollBox>
          </MobileCarouselWrapper>
        ) : (
          <CardGridContainer>
            <CardGrid spacing={2} justifyContent="flex-start">
              {exhibitionsToDisplay.map((exhibition) => (
                <StyledGridItem
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={exhibition.id}
                >
                  <Link to={`/exhibitions/${exhibition.id}`}>
                    <ExhibitionCard exhibition={exhibition} />
                  </Link>
                </StyledGridItem>
              ))}
            </CardGrid>
          </CardGridContainer>
        )}
      </ExhibitionsSection>

      <AboutSectionDivider />
      <AboutUs />
      <Footer />
    </HomePageContainer>
  );
};

export default Home;
