"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDivision } from "@/contexts/divisionContext"; // Assuming your context is in this path

export default function MapControls({
  selectedRegion,
  setSelectedRegion,
  selectedDistrict,
  setSelectedDistrict,
  selectedPeriod,
  setSelectedPeriod,
  selectedIndex,
  setSelectedIndex,
}) {
  const { divisions, setSelectedDivision } = useDivision();

  const handleDivisionChange = (value: string) => {
    const foundDivision = divisions.find((div) => div.name === value);
    setSelectedDistrict(value); // Update local selectedDistrict state if needed
    if (foundDivision) {
      setSelectedDivision(foundDivision); // Update the context
    } else {
      setSelectedDivision(null); // Clear context if no match
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium bg-blue-400 text-white py-2 px-4 mb-4 rounded">
        Map Controls
      </h3>

      <RadioGroup
        value={selectedRegion}
        onValueChange={setSelectedRegion}
        className="mb-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bangladesh" id="bangladesh" />
          <Label htmlFor="bangladesh">Bangladesh</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            checked={selectedDistrict}
            value="district"
            id="district"
          />
          <Label htmlFor="district">
            <Select
              value={selectedDistrict}
              onValueChange={handleDivisionChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((division) => (
                  <SelectItem key={division.osmId} value={division.name}>
                    {division.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
        </div>
      </RadioGroup>

      <h4 className="font-medium mb-2">Select Periodicity</h4>
      <RadioGroup
        value={selectedPeriod}
        onValueChange={setSelectedPeriod}
        className="mb-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Dekad (10 Days)" id="dekad" />
          <Label htmlFor="dekad">Dekad (10 Days)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1 Month" id="month" />
          <Label htmlFor="month">1 Month</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3 Months" id="3months" />
          <Label htmlFor="3months">3 Months</Label>
        </div>
      </RadioGroup>

      <h4 className="font-medium mb-2">Select 4 Indices</h4>
      <Select value={selectedIndex} onValueChange={setSelectedIndex}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Index" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Rainfall">Rainfall</SelectItem>
          <SelectItem value="Total Evapotranspiration">
            Total Evapotranspiration
          </SelectItem>
          <SelectItem value="Soil Moisture">Soil Moisture</SelectItem>
          <SelectItem value="Temperature">Temperature</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
