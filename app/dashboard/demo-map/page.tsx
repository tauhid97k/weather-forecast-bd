"use client";

import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { useEffect, useState, useCallback, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { Loader2 } from "lucide-react";
import { useDivision } from "@/contexts/divisionContext";

const DemoMapWithDivision = () => {
  const { selectedDivision, divisions } = useDivision();
  const [divisionBoundary, setDivisionBoundary] = useState<
    L.LatLngExpression[][]
  >([]);
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>(
    divisions[0].coordinates
  );
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const fetchDivisionBoundary = useCallback(async (osmId: number) => {
    setIsLoading(true);
    try {
      const apiUrl = `https://polygons.openstreetmap.fr/get_geojson.py?id=${osmId}&params=0`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data?.type === "MultiPolygon") {
        const coordinates = data.coordinates.map((polygon: number[][][]) =>
          polygon[0].map((coord: number[]) => [coord[1], coord[0]])
        );
        setDivisionBoundary(coordinates);
      } else if (data?.type === "Polygon") {
        const coordinates = data.coordinates.map((coord: number[]) => [
          coord[1],
          coord[0],
        ]);
        setDivisionBoundary([coordinates]);
      } else {
        console.error("Boundary data format not recognized:", data);
        setDivisionBoundary([]);
      }
    } catch (error) {
      console.error("Failed to fetch division boundary:", error);
      setDivisionBoundary([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      setIsLoading(true);
      setMapCenter(selectedDivision.coordinates);
      fetchDivisionBoundary(selectedDivision.osmId);

      if (mapRef.current) {
        mapRef.current.panTo(selectedDivision.coordinates);
      }
    }
  }, [selectedDivision, fetchDivisionBoundary]);

  return (
    <div className="relative">
      <MapContainer
        center={mapCenter}
        zoom={8}
        style={{ height: "600px", width: "100%" }}
        ref={mapRef}
        className={isLoading ? "opacity-50 pointer-events-none" : ""} // Optionally reduce opacity and disable interaction
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedDivision && (
          <Marker position={selectedDivision.coordinates}>
            <Popup>{selectedDivision.name}, Bangladesh</Popup>
          </Marker>
        )}
        {divisionBoundary.length > 0 &&
          divisionBoundary.map((polygon, index) => (
            <Polygon
              key={index}
              positions={polygon}
              color="blue"
              fillOpacity={0.1}
            />
          ))}

        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-25 z-10">
            <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default DemoMapWithDivision;
