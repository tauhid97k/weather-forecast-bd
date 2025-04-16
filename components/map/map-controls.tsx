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

export default function MapControls({
  selectedRegion,
  setSelectedRegion,
  selectedProvince,
  setSelectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  selectedPeriod,
  setSelectedPeriod,
  selectedIndex,
  setSelectedIndex,
}) {
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
          <RadioGroupItem value="Nepal" id="nepal" />
          <Label htmlFor="nepal">Nepal</Label>
        </div>
        <div className="flex items-center space-x-2 relative">
          <RadioGroupItem value="Province" id="province" />
          <Label htmlFor="province">
            <Select
              value={selectedProvince}
              onValueChange={setSelectedProvince}
              disabled={selectedRegion !== "Province"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Province1">Province1</SelectItem>
                <SelectItem value="Province2">Province2</SelectItem>
                <SelectItem value="Province3">Province3</SelectItem>
              </SelectContent>
            </Select>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="District" id="district" />
          <Label htmlFor="district">
            <Select
              value={selectedDistrict}
              onValueChange={setSelectedDistrict}
              disabled={selectedRegion !== "District"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jumla">Jumla</SelectItem>
                <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                <SelectItem value="Pokhara">Pokhara</SelectItem>
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
      <Select
        value={selectedIndex}
        onValueChange={setSelectedIndex}
        className="mb-2"
      >
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
