import React, { useState } from "react";
import MapView from "./MapView";
import Route from "./Route";
import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({ onRightClick, isDrawingEnabled }) => {
  useMapEvents({
    click: (e) => {
      if (!isDrawingEnabled) {
        // Permitir el movimiento del mapa con clic izquierdo
        e.originalEvent.stopPropagation();
      }
    },
    contextmenu: (e) => {
      if (isDrawingEnabled) {
        onRightClick([e.latlng.lat, e.latlng.lng]);
        e.originalEvent.preventDefault();
      }
    },
  });
  return null;
};

const MapWithRoute = () => {
  const [positions, setPositions] = useState([]);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);

  const handleRightClick = (position) => {
    setPositions((prev) => [...prev, position]);
  };

  const toggleDrawingMode = () => {
    setIsDrawingEnabled((prev) => !prev);
  };

  const removeLastPoint = () => {
    setPositions((prev) => prev.slice(0, -1));
  };

  const saveRouteToFile = () => {
    const routeName = prompt("Enter a name for your route:");
    if (!routeName) {
      alert("Route name is required.");
      return;
    }

    const blob = new Blob([JSON.stringify(positions)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${routeName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadRouteFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const loadedPositions = JSON.parse(e.target.result);
      setPositions(loadedPositions);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div>
        <button onClick={toggleDrawingMode}>
          {isDrawingEnabled ? "Disable Drawing" : "Enable Drawing"}
        </button>
        <button onClick={removeLastPoint} disabled={positions.length === 0}>
          Undo Last Point
        </button>
        <button onClick={saveRouteToFile} disabled={positions.length === 0}>
          Save Route to File
        </button>
        <input
          type="file"
          accept=".json"
          onChange={loadRouteFromFile}
          style={{ display: "inline-block", marginLeft: "10px" }}
        />
      </div>

      <MapView center={[51.505, -0.09]} zoom={13}>
        <Route positions={positions} color="blue" />
        <MapClickHandler
          onRightClick={handleRightClick}
          isDrawingEnabled={isDrawingEnabled}
        />
      </MapView>

      <style>
        {`
          .leaflet-container {
            cursor: ${isDrawingEnabled ? "crosshair" : "grab"};
          }
        `}
      </style>
    </div>
  );
};

export default MapWithRoute;
