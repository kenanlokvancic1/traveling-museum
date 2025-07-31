import React, { useState, useEffect } from "react";
import {
  DialogContainer,
  DialogHeader,
  DialogTitle,
  DialogContentStyled,
  Section,
  SectionTitle,
  ImagePreviewWrapper,
  ImagePreview,
  Title,
  CloseButton,
  PaintingsContainer,
  MapWrapper,
} from "./TrackingDialog.styles";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { getPaintingsByExhibition } from "../../../api/ExhibitionPainting";
import { getPaintingById } from "../../../api/PaintingApi";
import { getMuseumById } from "../../../api/MuseumApi";

const API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

const TrackingDialog = ({ open, onClose, exhibition }) => {
  const [location, setLocation] = useState([43.8563, 18.4131]);
  const [exhibitionPaintings, setExhibitionPaintings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [museumName, setMuseumName] = useState("Museum Location");

  const parseCoordinates = (coordsString) => {
    const coords = coordsString
      .replace(/[^\d.,\sNSEW\-]/gi, "")
      .trim()
      .split(",");
    if (coords.length !== 2) return null;

    let lat = coords[0].trim();
    let lng = coords[1].trim();

    const parse = (val) => {
      if (/[NS]$/i.test(val)) {
        const num = parseFloat(val);
        return /S$/i.test(val) ? -num : num;
      } else if (/[EW]$/i.test(val)) {
        const num = parseFloat(val);
        return /W$/i.test(val) ? -num : num;
      }
      return parseFloat(val);
    };

    const latParsed = parse(lat);
    const lngParsed = parse(lng);

    if (isNaN(latParsed) || isNaN(lngParsed)) return null;

    return [latParsed, lngParsed];
  };

  const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center]);
    return null;
  };

  useEffect(() => {
    const fetchMuseumAndPaintings = async () => {
      if (!exhibition || !open) return;

      setLoading(true);
      try {
        if (exhibition.museum_id) {
          const museumRes = await getMuseumById(exhibition.museum_id);
          const coords = parseCoordinates(museumRes.data.coordinates);
          if (coords) {
            setLocation(coords);
          }
          setMuseumName(museumRes.data.name);
        }

        const paintingIdsData = await getPaintingsByExhibition(
          exhibition.exhibition_id
        );
        const paintingDetailsPromises = paintingIdsData.map((p) =>
          getPaintingById(p.painting_id)
        );
        const paintings = await Promise.all(paintingDetailsPromises);

        setExhibitionPaintings(paintings);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMuseumAndPaintings();
  }, [exhibition, open]);

  if (!exhibition) return null;

  const { name, status, destination, transportMethods } = exhibition;

  return (
    <DialogContainer open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogHeader>
        <DialogTitle>{name}</DialogTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
      </DialogHeader>

      <DialogContentStyled>
        <Section>
          <SectionTitle>Status:</SectionTitle>
          <p>{status}</p>
        </Section>

        {(status === "in transport" || status === "delivered") && (
          <>
            <Section>
              <SectionTitle>Destination:</SectionTitle>
              <p>{destination}</p>
            </Section>

            <Section>
              <SectionTitle>Transport Methods:</SectionTitle>
              {transportMethods && transportMethods.length > 0 ? (
                <ul>
                  {transportMethods.map((method, i) => (
                    <li key={i}>{method}</li>
                  ))}
                </ul>
              ) : (
                <p>No transport methods available</p>
              )}
            </Section>

            <Section>
              <SectionTitle>Museum:</SectionTitle>
              <p>{museumName}</p>
              <MapWrapper>
                <MapContainer
                  center={location}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TileLayer
                    url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${API_KEY}`}
                    attribution='© <a href="https://www.maptiler.com/">MapTiler</a>'
                  />
                  <RecenterMap center={location} />
                  <Marker position={location}>
                    <Popup>{museumName}</Popup>
                  </Marker>
                </MapContainer>
              </MapWrapper>
            </Section>

            <Section>
              <SectionTitle>Paintings:</SectionTitle>
              <PaintingsContainer>
                {loading ? (
                  <p>Loading paintings...</p>
                ) : (
                  exhibitionPaintings.map((painting, idx) => (
                    <ImagePreviewWrapper key={idx}>
                      <ImagePreview
                        src={painting.image_url}
                        alt={painting.title}
                      />
                      <Title>{painting.title}</Title>
                    </ImagePreviewWrapper>
                  ))
                )}
              </PaintingsContainer>
            </Section>
          </>
        )}

        {status === "in warehouse" && (
          <Section>
            <p>
              Currently in warehouse. No further data available at this time.
            </p>
          </Section>
        )}
      </DialogContentStyled>
    </DialogContainer>
  );
};

export default TrackingDialog;
