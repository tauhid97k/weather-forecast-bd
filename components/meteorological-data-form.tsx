"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Thermometer, Droplets, Wind, Eye, Cloud, Clock, BarChart3, Gauge } from "lucide-react"

export function MeteorologicalDataForm() {
  const [formData, setFormData] = useState({})
  const [activeTab, setActiveTab] = useState("pressure")

  // Refs for multi-box inputs to handle auto-focus
  const dataTypeRefs = [useRef(null), useRef(null)]
  const stationNoRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  const yearRefs = [useRef(null), useRef(null)]

  // Tab styles with gradients and more vibrant colors
  const tabStyles = {
    pressure: {
      tab: "from-rose-500 to-red-600 text-white hover:opacity-90 shadow-md shadow-rose-200/50",
      card: "bg-gradient-to-br from-rose-50 to-white border-l-4 border-rose-500 shadow-md",
      icon: <BarChart3 className="h-4 w-4 mr-1" />,
    },
    temperature: {
      tab: "from-blue-500 to-indigo-600 text-white hover:opacity-90 shadow-md shadow-blue-200/50",
      card: "bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500 shadow-md",
      icon: <Thermometer className="h-4 w-4 mr-1" />,
    },
    Td: {
      tab: "from-emerald-500 to-green-600 text-white hover:opacity-90 shadow-md shadow-emerald-200/50",
      card: "bg-gradient-to-br from-emerald-50 to-white border-l-4 border-emerald-500 shadow-md",
      icon: <Droplets className="h-4 w-4 mr-1" />,
    },
    humidity: {
      tab: "from-violet-500 to-purple-600 text-white hover:opacity-90 shadow-md shadow-violet-200/50",
      card: "bg-gradient-to-br from-violet-50 to-white border-l-4 border-violet-500 shadow-md",
      icon: <Gauge className="h-4 w-4 mr-1" />,
    },
    squall: {
      tab: "from-amber-500 to-yellow-600 text-white hover:opacity-90 shadow-md shadow-amber-200/50",
      card: "bg-gradient-to-br from-amber-50 to-white border-l-4 border-amber-500 shadow-md",
      icon: <Wind className="h-4 w-4 mr-1" />,
    },
    "V.V": {
      tab: "from-orange-500 to-amber-600 text-white hover:opacity-90 shadow-md shadow-orange-200/50",
      card: "bg-gradient-to-br from-orange-50 to-white border-l-4 border-orange-500 shadow-md",
      icon: <Eye className="h-4 w-4 mr-1" />,
    },
    weather: {
      tab: "from-cyan-500 to-teal-600 text-white hover:opacity-90 shadow-md shadow-cyan-200/50",
      card: "bg-gradient-to-br from-cyan-50 to-white border-l-4 border-cyan-500 shadow-md",
      icon: <Cloud className="h-4 w-4 mr-1" />,
    },
    indicators: {
      tab: "from-fuchsia-500 to-pink-600 text-white hover:opacity-90 shadow-md shadow-fuchsia-200/50",
      card: "bg-gradient-to-br from-fuchsia-50 to-white border-l-4 border-fuchsia-500 shadow-md",
      icon: <Clock className="h-4 w-4 mr-1" />,
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle input for segmented boxes with auto-focus to next box
  const handleSegmentedInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    refs: React.RefObject<HTMLInputElement>[],
    fieldName: string,
  ) => {
    const { value } = e.target

    // Update form data with the specific segment
    setFormData((prev) => ({
      ...prev,
      [fieldName]: {
        ...(prev[fieldName] || {}),
        [index]: value,
      },
    }))

    // Auto-focus to next input if value is entered and not the last box
    if (value && index < refs.length - 1) {
      refs[index + 1].current?.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      {/* Header Section - Single Line */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg">
        <div className="absolute " />
        <CardHeader className="relative">
          <CardTitle className="text-2xl text-center text-black font-bold">First Card</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-wrap justify-between gap-8">
            {/* Data Type */}
            <div className="space-y-2">
              <Label htmlFor="dataType" className="text-black font-medium">
                Data Type
              </Label>
              <div className="flex space-x-1 ">
                {[0, 1].map((i) => (
                  <Input
                    key={`dataType-${i}`}
                    id={`dataType-${i}`}
                    ref={dataTypeRefs[i]}
                    className="w-10 text-center p-2 bg-white/90 border-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    maxLength={1}
                    onChange={(e) => handleSegmentedInput(e, i, dataTypeRefs, "dataType")}
                  />
                ))}
              </div>
            </div>

            {/* Station No */}
            <div className="space-y-2 ">
              <Label htmlFor="stationNo" className="text-black font-medium">
                Station No
              </Label>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Input
                    key={`stationNo-${i}`}
                    id={`stationNo-${i}`}
                    ref={stationNoRefs[i]}
                    className=" w-10 text-center p-2 bg-white/90 border-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    maxLength={1}
                    onChange={(e) => handleSegmentedInput(e, i, stationNoRefs, "stationNo")}
                  />
                ))}
              </div>
            </div>

            {/* Station Name */}
            <div className="space-y-2 flex-1">
              <Label htmlFor="stationName" className="text-black font-medium">
                Station Name
              </Label>
              <Input
                id="stationName"
                name="stationName"
                onChange={handleChange}
                className="bg-white/90 border-2 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year" className="text-black font-medium">
                Year
              </Label>
              <div className="flex space-x-1">
                {[0, 1].map((i) => (
                  <Input
                    key={`year-${i}`}
                    id={`year-${i}`}
                    ref={yearRefs[i]}
                    className="w-10 text-center p-2 bg-white/90 border-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    maxLength={1}
                    onChange={(e) => handleSegmentedInput(e, i, yearRefs, "year")}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*Card Body */}
      <Card className="border-none shadow-xl overflow-hidden">
        <CardContent className="p-6">
          <Tabs defaultValue="pressure" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8  rounded-xl p-1 gap-1">
              {Object.entries(tabStyles).map(([key, style]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "rounded-lg bg-gradient-to-br transition-all duration-300 transform hover:scale-105",
                    style.tab,
                    activeTab === key ? "ring-2 ring-white ring-offset-1" : "",
                  )}
                >
                  <div className="flex items-center justify-center">
                    {style.icon}
                    <span className="hidden md:inline">{key === "V.V" ? "VV" : key}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Bar Pressure Tab */}
            <TabsContent value="pressure" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles.pressure.card)}>
                <div className="p-4 bg-gradient-to-r from-rose-500 to-red-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <BarChart3 className="mr-2" /> Bar Pressure Measurements
                  </h3>
                </div>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="subIndicator">1st Card Indicator</Label>
                    <Input
                      id="subIndicator"
                      name="subIndicator"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alteredThermometer">Altered Thermometer</Label>
                    <Input
                      id="alteredThermometer"
                      name="alteredThermometer"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barAsRead">Bar As Read(hPa)</Label>
                    <Input
                      id="barAsRead"
                      name="barAsRead"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctedForIndex">Corrected for Index Temp-gravity(hPa)</Label>
                    <Input
                      id="correctedForIndex"
                      name="correctedForIndex"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heightDifference">Height Difference Correction(hPa)</Label>
                    <Input
                      id="heightDifference"
                      name="heightDifference"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctionForTemp">Correction for Temp</Label>
                    <Input
                      id="correctionForTemp"
                      name="correctionForTemp"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stationLevelPressure">Station Level Pressure (P.P.P.P.hpa)</Label>
                    <Input
                      id="stationLevelPressure"
                      name="stationLevelPressure"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seaLevelReduction">Sea Level Reduction Constant</Label>
                    <Input
                      id="seaLevelReduction"
                      name="seaLevelReduction"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctedSeaLevelPressure">Sea-Level Pressure(PPPP)hpa</Label>
                    <Input
                      id="correctedSeaLevelPressure"
                      name="correctedSeaLevelPressure"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="afternoonReading">Altimeter setting(QNH)</Label>
                    <Input
                      id="afternoonReading"
                      name="afternoonReading"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressureChange24h">24-Hour Pressure Change</Label>
                    <Input
                      id="pressureChange24h"
                      name="pressureChange24h"
                      onChange={handleChange}
                      className="transition-all focus:border-rose-500 focus:ring-rose-500/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Temperature Tab */}
            <TabsContent value="temperature" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles.temperature.card)}>
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Thermometer className="mr-2" /> Temperature Measurements
                  </h3>
                </div>
                <CardContent className="pt-6">
                  <Tabs defaultValue="as-read" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-blue-50 rounded-lg">
                      <TabsTrigger
                        value="as-read"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                      >
                        As Read
                      </TabsTrigger>
                      <TabsTrigger
                        value="corrected"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                      >
                        Corrected
                      </TabsTrigger>
                    </TabsList>

                    {/* As Read Temperature Values */}
                    <TabsContent value="as-read" className="mt-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="dryBulbAsRead">Dry-bulb (°C)</Label>
                          <Input
                            id="dryBulbAsRead"
                            name="dryBulbAsRead"
                            onChange={handleChange}
                            className="transition-all focus:border-blue-500 focus:ring-blue-500/30"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="wetBulbAsRead">Wet-bulb (°C)</Label>
                          <Input
                            id="wetBulbAsRead"
                            name="wetBulbAsRead"
                            onChange={handleChange}
                            className="transition-all focus:border-blue-500 focus:ring-blue-500/30"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maxMinTempAsRead">MAX/MIN (°C)</Label>
                          <Input
                            id="maxMinTempAsRead"
                            name="maxMinTempAsRead"
                            onChange={handleChange}
                            className="transition-all focus:border-blue-500 focus:ring-blue-500/30"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Corrected Temperature Values */}
                    <TabsContent value="corrected" className="mt-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="dryBulbCorrected">Dry-bulb (°C)</Label>
                          <Input
                            id="dryBulbCorrected"
                            name="dryBulbCorrected"
                            onChange={handleChange}
                            className="transition-all focus:border-blue-500 focus:ring-blue-500/30"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="wetBulbCorrected">Wet-bulb (°C)</Label>
                          <Input
                            id="wetBulbCorrected"
                            name="wetBulbCorrected"
                            onChange={handleChange}
                            className="transition-all focus:border-blue-500 focus:ring-blue-500/30"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maxMinTempCorrected">MAX/MIN (°C)</Label>
                          <Input
                            id="maxMinTempCorrected"
                            name="maxMinTempCorrected"
                            onChange={handleChange}
                            className="transition-all focus:border-blue-500 focus:ring-blue-500/30"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TdTdTd Tabs */}
            <TabsContent value="Td" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles.Td.card)}>
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Droplets className="mr-2" /> Dew Point Temperature
                  </h3>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="Td">Dew-Point Temperature (&deg;C)</Label>
                    <Input
                      id="Td"
                      name="Td"
                      onChange={handleChange}
                      className="transition-all focus:border-emerald-500 focus:ring-emerald-500/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Humidity Tab */}
            <TabsContent value="humidity" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles.humidity.card)}>
                <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Gauge className="mr-2" /> Relative Humidity
                  </h3>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="relativeHumidity">Relative Humidity (%)</Label>
                    <Input
                      id="relativeHumidity"
                      name="relativeHumidity"
                      type="number"
                      min="0"
                      max="100"
                      onChange={handleChange}
                      className="transition-all focus:border-violet-500 focus:ring-violet-500/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Squall Tab */}
            <TabsContent value="squall" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles.squall.card)}>
                <div className="p-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Wind className="mr-2" /> Squall Measurements
                  </h3>
                </div>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="squallForce">Force (KTS)</Label>
                    <Input
                      id="squallForce"
                      name="squallForce"
                      onChange={handleChange}
                      className="transition-all focus:border-amber-500 focus:ring-amber-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squallDirection">Direction (°d)</Label>
                    <Input
                      id="squallDirection"
                      name="squallDirection"
                      type="number"
                      min="0"
                      max="360"
                      onChange={handleChange}
                      className="transition-all focus:border-amber-500 focus:ring-amber-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squallTime">Time (qt)</Label>
                    <Input
                      id="squallTime"
                      name="squallTime"
                      onChange={handleChange}
                      className="transition-all focus:border-amber-500 focus:ring-amber-500/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* VV Tab */}
            <TabsContent value="V.V" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles["V.V"].card)}>
                <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Eye className="mr-2" /> Visibility Measurements
                  </h3>
                </div>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="horizontalVisibility">Horizontal Visibility</Label>
                    <Input
                      id="horizontalVisibility"
                      name="horizontalVisibility"
                      onChange={handleChange}
                      className="transition-all focus:border-orange-500 focus:ring-orange-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="miscMeteors">Misc Meteors(Code)</Label>
                    <Input
                      id="miscMeteors"
                      name="miscMeteors"
                      onChange={handleChange}
                      className="transition-all focus:border-orange-500 focus:ring-orange-500/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Weather Tab */}
            <TabsContent value="weather" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles.weather.card)}>
                <div className="p-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Cloud className="mr-2" /> Weather Conditions
                  </h3>
                </div>
                <CardContent className="pt-6">
                  <Tabs defaultValue="past" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-cyan-50 rounded-lg">
                      <TabsTrigger
                        value="past"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                      >
                        Past
                      </TabsTrigger>
                      <TabsTrigger
                        value="present"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                      >
                        Present
                      </TabsTrigger>
                    </TabsList>

                    {/* Past Weather */}
                    <TabsContent value="past" className="mt-4">
                      <Tabs defaultValue="w1" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-cyan-50/50 rounded-lg">
                          <TabsTrigger
                            value="w1"
                            className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white"
                          >
                            W1
                          </TabsTrigger>
                          <TabsTrigger
                            value="w2"
                            className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white"
                          >
                            W2
                          </TabsTrigger>
                        </TabsList>

                        {/* W1 Past Weather */}
                        <TabsContent value="w1" className="mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="pastWeatherW1">Past Weather (W1)</Label>
                            <Input
                              id="pastWeatherW1"
                              name="pastWeatherW1"
                              placeholder="Enter past weather code (0-9)"
                              onChange={handleChange}
                              className="transition-all focus:border-cyan-500 focus:ring-cyan-500/30"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Weather code for the first part of the observation period
                            </p>
                          </div>
                        </TabsContent>

                        {/* W2 Past Weather */}
                        <TabsContent value="w2" className="mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="pastWeatherW2">Past Weather (W2)</Label>
                            <Input
                              id="pastWeatherW2"
                              name="pastWeatherW2"
                              placeholder="Enter past weather code (0-9)"
                              onChange={handleChange}
                              className="transition-all focus:border-cyan-500 focus:ring-cyan-500/30"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Weather code for the second part of the observation period
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </TabsContent>

                    {/* Present Weather */}
                    <TabsContent value="present" className="mt-4">
                      <Tabs defaultValue="ww" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 bg-cyan-50/50 rounded-lg">
                          <TabsTrigger
                            value="ww"
                            className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white"
                          >
                            WW
                          </TabsTrigger>
                        </TabsList>

                        {/* WW Present Weather */}
                        <TabsContent value="ww" className="mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="presentWeatherWW">Present Weather (WW)</Label>
                            <Input
                              id="presentWeatherWW"
                              name="presentWeatherWW"
                              placeholder="Enter present weather code (00-99)"
                              onChange={handleChange}
                              className="transition-all focus:border-cyan-500 focus:ring-cyan-500/30"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Current weather conditions at time of observation
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Indicators Tab */}
            <TabsContent value="indicators" className="mt-6 transition-all duration-500">
              <Card className={cn("overflow-hidden", tabStyles.indicators.card)}>
                <div className="p-4 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Clock className="mr-2" /> Time Indicators
                  </h3>
                </div>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="c2Indicator">C2: 2nd Card Indicator</Label>
                    <Input
                      id="c2Indicator"
                      name="c2Indicator"
                      onChange={handleChange}
                      className="transition-all focus:border-fuchsia-500 focus:ring-fuchsia-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observationTime">GG: Time of Observation (UTC)</Label>
                    <Input
                      id="observationTime"
                      name="observationTime"
                      type="time"
                      onChange={handleChange}
                      className="transition-all focus:border-fuchsia-500 focus:ring-fuchsia-500/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="border-slate-300 hover:bg-slate-100 transition-all duration-300"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 transition-all duration-300 shadow-lg"
            >
              Submit Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
