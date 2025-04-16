"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Plus, Minus } from "lucide-react";
import L from "leaflet";

// **Broader Bangladesh Boundary (from your data)**
const bangladeshBoundary = {
  type: "Polygon",
  coordinates: [
    [
      [89.3012313, 22.8456525],
      [89.3012313, 24.7886924],
      [91.2487769, 24.7886924],
      [91.2487769, 22.8456525],
      [89.3012313, 22.8456525],
    ],
  ],
};

// SPI color scale
const spiColors = [
  { value: "-2 and less", color: "#730000", label: "Extremely Dry" },
  { value: "-2 to -1.5", color: "#e60000", label: "Severely Dry" },
  { value: "-1.5 to -1", color: "#ffaa00", label: "Moderately Dry" },
  { value: "-1 to 1", color: "#ffffbe", label: "Near Normal" },
  { value: "1 to 1.5", color: "#a6f28f", label: "Moderately Wet" },
  { value: "1.5 to 2", color: "#00deff", label: "Severely Wet" },
  { value: "2 and above", color: "#0000ff", label: "Extremely Wet" },
];

// Custom zoom control buttons
function CustomZoomControl() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1 z-[1000]">
      <Button
        size="icon"
        variant="secondary"
        onClick={handleZoomIn}
        className="h-8 w-8 bg-white"
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        onClick={handleZoomOut}
        className="h-8 w-8 bg-white"
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Fix for Leaflet icons in SSR/Next.js
function FixLeafletIcons() {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  return null;
}

export default function MapComponent({ currentDate, setCurrentDate }) {
  const [selectedLayer, setSelectedLayer] = useState("SPI");
  const mapRef = useRef(null);

  const dates = [
    "18-Oct",
    "19-Nov",
    "19-Dec",
    "19-Jan",
    "19-Feb",
    "19-Mar",
    "19-Apr",
    "19-May",
    "19-Jun",
  ];
  const dateIndex = dates.indexOf(currentDate);

  const handleDateChange = (value) => {
    setCurrentDate(dates[value[0]]);
  };

  // Style function for GeoJSON
  const geoJSONStyle = {
    color: "green", // Changed to green to represent this broader area
    weight: 2,
    fillOpacity: 0.1,
    fillColor: "lightgreen", // Optional: Added a light green fill
  };

  // Calculate the center and bounds for this boundary
  const centerLat = (22.8456525 + 24.7886924) / 2;
  const centerLng = (89.3012313 + 91.2487769) / 2;

  return (
    <div className="relative h-[600px]">
      <MapContainer
        center={[centerLat, centerLng]} // Centering on the provided coordinates
        zoom={8} // Adjusted zoom to fit the broader area
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <FixLeafletIcons />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={bangladeshBoundary} style={geoJSONStyle} />
        <CustomZoomControl />
      </MapContainer>

      {/* Layer selector */}
      <div className="absolute top-2 right-2 z-[9999999]">
        <Select
          value={selectedLayer}
          onValueChange={setSelectedLayer}
          modal={false}
        >
          <SelectTrigger className="w-[100px] bg-white">
            <SelectValue placeholder="Layer" />
          </SelectTrigger>
          <SelectContent className="z-[9999999]">
            <SelectItem value="SPI">SPI</SelectItem>
            <SelectItem value="Rainfall">Rainfall</SelectItem>
            <SelectItem value="Temperature">Temperature</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SPI Legend */}
      <div className="absolute bottom-16 right-2 bg-white p-2 rounded shadow z-[1000]">
        <h4 className="font-bold mb-1">SPI</h4>
        {spiColors.map((item) => (
          <div key={item.value} className="flex items-center gap-2 text-xs">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="w-16">{item.value}</div>
            <div>{item.label}</div>
          </div>
        ))}
        <div className="text-xs text-right mt-1">Leaflet</div>
      </div>

      {/* Timeline controls */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 bg-white p-2 rounded shadow z-[1000]">
        <div className="w-16">{dates[0]}</div>
        <Button size="icon" variant="outline" className="h-6 w-6">
          <Play className="h-3 w-3" />
        </Button>
        <div className="w-16">{dates[dates.length - 1]}</div>
        <div className="flex-1 px-4">
          <Slider
            defaultValue={[dateIndex]}
            max={dates.length - 1}
            step={1}
            onValueChange={handleDateChange}
          />
        </div>
        <div className="w-16 text-center">{currentDate}</div>
      </div>
    </div>
  );
}
