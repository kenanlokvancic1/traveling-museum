import React, { useEffect, useState } from "react";
import {
  DialogContainer,
  DialogHeader,
  DialogTitle,
  DialogContentStyled,
  MapWrapper,
  CloseButton,
} from "./MapDialog.styles";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

const MapDialog = ({ open, onClose, coordinates, museumName }) => {
  const [location, setLocation] = useState([43.8563, 18.4131]);

  useEffect(() => {
    if (coordinates) {
      const coords = coordinates
        .replace(/[^\d.,\sNSEW\-]/gi, "")
        .trim()
        .split(",");
      if (coords.length !== 2) return;
  
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
  
      if (!isNaN(latParsed) && !isNaN(lngParsed)) {
        setLocation([latParsed, lngParsed]);
      }
    }
  }, [coordinates]);
  

  return (
    <DialogContainer open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogHeader>
        <DialogTitle>{museumName}</DialogTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
      </DialogHeader>
      <DialogContentStyled>
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
            <Marker position={location}>
              <Popup>{museumName || "Museum location"}</Popup>
            </Marker>
          </MapContainer>
        </MapWrapper>
      </DialogContentStyled>
    </DialogContainer>
  );
};

export default MapDialog;
