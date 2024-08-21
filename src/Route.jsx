import React from "react";
import { Polyline } from "react-leaflet";

const Route = ({ positions, color }) => {
  return <Polyline positions={positions} color={color || "blue"} />;
};

export default Route;
