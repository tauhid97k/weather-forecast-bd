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




// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ChevronsUpDown, Check } from "lucide-react"

// const districts = [
//   { id: "dhaka", name: "Dhaka" },
//   { id: "chittagong", name: "Chittagong" },
//   { id: "khulna", name: "Khulna" },
//   { id: "rajshahi", name: "Rajshahi" },
//   { id: "sylhet", name: "Sylhet" },
//   { id: "barisal", name: "Barisal" },
//   { id: "rangpur", name: "Rangpur" },
//   { id: "mymensingh", name: "Mymensingh" },
// ]

// const layers = ["Temperature", "Rainfall", "Wind", "Condition"]

// const conditions = ["sunny", "partly-cloudy", "cloudy", "rain", "heavy-rain", "thunderstorm"]

// export default function MapControls({
//   selectedDistrict,
//   setSelectedDistrict,
//   currentDate,
//   setCurrentDate,
//   isPlaying,
//   setIsPlaying,
//   selectedLayer,
//   setSelectedLayer,
//   weatherData,
//   filteredConditions = [], // Add default empty array
//   setFilteredConditions,
//   zoomToDistrict,
// }) {
//   const dates = ["18-Oct", "19-Nov", "19-Dec", "19-Jan", "19-Feb", "19-Mar", "19-Apr", "19-May", "19-Jun"]

//   // Add a safety check for the condition filter buttons
//   const handleConditionToggle = (condition) => {
//     if (!filteredConditions) {
//       // Initialize with all conditions except the one being toggled
//       setFilteredConditions(conditions.filter((c) => c !== condition))
//     } else if (filteredConditions.includes(condition)) {
//       setFilteredConditions(filteredConditions.filter((c) => c !== condition))
//     } else {
//       setFilteredConditions([...filteredConditions, condition])
//     }
//   }

//   return (
//     <div className="bg-white p-3 rounded shadow w-full">
//       <h3 className="font-bold text-lg mb-2 text-center">Map Controls</h3>

//       {/* District Selection */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" className="w-full justify-between">
//             {selectedDistrict ? selectedDistrict.name : "Select District"}
//             <ChevronsUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>Select a district</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {districts.map((district) => (
//             <DropdownMenuItem
//               key={district.id}
//               onSelect={() => {
//                 setSelectedDistrict(district)
//                 zoomToDistrict(district)
//               }}
//             >
//               {district.name}
//               {selectedDistrict?.id === district.id && <Check className="ml-auto h-4 w-4" />}
//             </DropdownMenuItem>
//           ))}
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onSelect={() => setSelectedDistrict(null)}>Clear Selection</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Layer Selection */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" className="w-full justify-between">
//             {selectedLayer || "Select Layer"}
//             <ChevronsUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>Select a layer</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {layers.map((layer) => (
//             <DropdownMenuItem key={layer} onSelect={() => setSelectedLayer(layer)}>
//               {layer}
//               {selectedLayer === layer && <Check className="ml-auto h-4 w-4" />}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Condition Filters */}
//       <div className="mt-3">
//         <h4 className="font-semibold mb-1">Filter Conditions</h4>
//         <div className="flex flex-wrap gap-2">
//           {conditions.map((condition) => (
//             <Button
//               key={condition}
//               variant={filteredConditions && filteredConditions.includes(condition) ? "default" : "outline"}
//               size="sm"
//               onClick={() => handleConditionToggle(condition)}
//             >
//               {condition}
//             </Button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
