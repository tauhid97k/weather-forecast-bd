"use client";

import { createContext, useState, useContext } from "react";
import { LatLngExpression } from "leaflet";

interface DivisionOption {
  name: string;
  osmId: number;
  coordinates: LatLngExpression;
}

interface DivisionContextType {
  selectedDivision: DivisionOption | null;
  setSelectedDivision: (division: DivisionOption | null) => void;
  divisions: DivisionOption[];
}

const initialDivisions: DivisionOption[] = [
  { name: "Dhaka", osmId: 3921322, coordinates: [23.7779, 90.3995] },
  { name: "Chittagong", osmId: 3824588, coordinates: [22.3569, 91.7832] },
  { name: "Mymensingh", osmId: 7318343, coordinates: [24.7145, 90.4069] },
  { name: "Khulna", osmId: 3825003, coordinates: [22.8456, 89.5403] },
  { name: "Rajshahi", osmId: 3859335, coordinates: [24.3745, 88.6042] },
  { name: "Sylhet", osmId: 3921222, coordinates: [24.8949, 91.8687] },
  { name: "Barishal", osmId: 3921298, coordinates: [22.701, 90.3535] },
  { name: "Rangpur", osmId: 3921211, coordinates: [25.7439, 89.2532] },
];

const DivisionContext = createContext<DivisionContextType>({
  selectedDivision: null,
  setSelectedDivision: () => {},
  divisions: initialDivisions, // Include divisions in the default value
});

export const DivisionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDivision, setSelectedDivision] =
    useState<DivisionOption | null>(initialDivisions[0]);

  return (
    <DivisionContext.Provider
      value={{
        selectedDivision,
        setSelectedDivision,
        divisions: initialDivisions,
      }}
    >
      {children}
    </DivisionContext.Provider>
  );
};

export const useDivision = () => useContext(DivisionContext);
