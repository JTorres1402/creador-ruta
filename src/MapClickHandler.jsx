import React from "react";
import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: (e) => {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

export default MapClickHandler;
