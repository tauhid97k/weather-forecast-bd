"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MeteorologicalDataForm() {
  const [formData, setFormData] = useState({})
  const [activeTab, setActiveTab] = useState("pressure")

  // Refs for multi-box inputs to handle auto-focus
  const dataTypeRefs = [useRef(null), useRef(null)]
  const stationNoRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  const yearRefs = [useRef(null), useRef(null)]

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
    <form onSubmit={handleSubmit}>
        {/* Header Section - Single Line */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center">First Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap  justify-between gap-8">
            {/* Data Type */}
            <div className="space-y-2 ">
              <Label htmlFor="dataType ">Data Type</Label>
              <div className="flex space-x-1">
                {[0, 1].map((i) => (
                  <Input
                    key={`dataType-${i}`}
                    id={`dataType-${i}`}
                    ref={dataTypeRefs[i]}
                    className="w-10 text-center p-2"
                    maxLength={1}
                    onChange={(e) => handleSegmentedInput(e, i, dataTypeRefs, "dataType")}
                  />
                ))}
              </div>
            </div>

            {/* Station No */}
            <div className="space-y-2">
              <Label htmlFor="stationNo">Station No</Label>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Input
                    key={`stationNo-${i}`}
                    id={`stationNo-${i}`}
                    ref={stationNoRefs[i]}
                    className="w-10 text-center p-2"
                    maxLength={1}
                    onChange={(e) => handleSegmentedInput(e, i, stationNoRefs, "stationNo")}
                  />
                ))}
              </div>
            </div>

            {/* Station Name */}
            <div className="space-y-2 flex-1 ">
              <Label htmlFor="stationName">Station Name</Label>
              <Input id="stationName" name="stationName" onChange={handleChange} />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <div className="flex space-x-1">
                {[0, 1].map((i) => (
                  <Input
                    key={`year-${i}`}
                    id={`year-${i}`}
                    ref={yearRefs[i]}
                    className="w-10 text-center p-2"
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
      <Card>
        <CardContent>
          <Tabs defaultValue="pressure" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3  md:grid-cols-8">
              <TabsTrigger value="pressure">Bar Pressure</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="Td">T<sub>d</sub>T<sub>d</sub>T<sub>d</sub></TabsTrigger>
              <TabsTrigger value="humidity">R.H.</TabsTrigger>
              <TabsTrigger value="squall">Squall</TabsTrigger>
              <TabsTrigger value="V.V">VV</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="indicators">Indicators</TabsTrigger>
            </TabsList>

            {/* Bar Pressure Tab */}
            <TabsContent value="pressure" className="mt-4">
              <Card>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="subIndicator">1st Card Indicator</Label>
                    <Input className="border-2" id="subIndicator" name="subIndicator" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alteredThermometer">Altered Thermometer</Label>
                    <Input className="border-2" id="alteredThermometer" name="alteredThermometer" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barAsRead">Bar As Read(hPa)</Label>
                    <Input className="border-2" id="barAsRead" name="barAsRead" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctedForIndex">Corrected for Index Temp-gravity(hPa)</Label>
                    <Input className="border-2" id="correctedForIndex" name="correctedForIndex" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heightDifference">Height Difference Correction(hPa)</Label>
                    <Input className="border-2" id="heightDifference" name="heightDifference" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctionForTemp">Correction for Temp</Label>
                    <Input className="border-2" id="correctionForTemp" name="correctionForTemp" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stationLevelPressure">Station Level Pressure (P.P.P.P.hpa)</Label>
                    <Input className="border-2" id="stationLevelPressure" name="stationLevelPressure" onChange={handleChange} />
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="seaLevelReduction">Sea Level Reduction Constant</Label>
                    <Input className="border-2" id="seaLevelReduction" name="seaLevelReduction" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctedSeaLevelPressure">Sea-Level Pressure(PPPP)hpa</Label>
                    <Input className="border-2" id="correctedSeaLevelPressure" name="correctedSeaLevelPressure" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="afternoonReading">Altimeter setting(QNH)</Label>
                    <Input className="border-2" id="afternoonReading" name="afternoonReading" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressureChange24h">24-Hour Pressure Change</Label>
                    <Input className="border-2" id="pressureChange24h" name="pressureChange24h" onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Temperature Tab */}
            <TabsContent value="temperature" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="as-read" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="as-read">As Read</TabsTrigger>
                      <TabsTrigger value="corrected">Corrected</TabsTrigger>
                    </TabsList>

                    {/* As Read Temperature Values */}
                    <TabsContent value="as-read" className="mt-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="dryBulbAsRead">Dry-bulb (°C)</Label>
                          <Input className="border-2" id="dryBulbAsRead" name="dryBulbAsRead" onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="wetBulbAsRead">Wet-bulb (°C)</Label>
                          <Input className="border-2" id="wetBulbAsRead" name="wetBulbAsRead" onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maxMinTempAsRead">MAX/MIN (°C)</Label>
                          <Input className="border-2" id="maxMinTempAsRead" name="maxMinTempAsRead" onChange={handleChange} />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Corrected Temperature Values */}
                    <TabsContent value="corrected" className="mt-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="dryBulbCorrected">Dry-bulb (°C)</Label>
                          <Input className="border-2" id="dryBulbCorrected" name="dryBulbCorrected" onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="wetBulbCorrected">Wet-bulb (°C)</Label>
                          <Input className="border-2" id="wetBulbCorrected" name="wetBulbCorrected" onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maxMinTempCorrected">MAX/MIN (°C)</Label>
                          <Input className="border-2" id="maxMinTempCorrected" name="maxMinTempCorrected" onChange={handleChange} />
                        </div>

                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Humidity Tab */}
            <TabsContent value="humidity" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="relativeHumidity">Relative Humidity (%)</Label>
                    <Input
                    className="border-2"
                      id="relativeHumidity"
                      name="relativeHumidity"
                      type="number"
                      min="0"
                      max="100"
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* TdTdTd Tabs */}
            <TabsContent value="Td" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                <div className="space-y-2">
                    <Label htmlFor="Td">Dew-Point Temprrature (&deg;C)</Label>
                    <Input className="border-2" id="Td" name="Td" onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Squall Tab */}
            <TabsContent value="squall" className="mt-4">
              <Card>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="squallForce">Force (KTS)</Label>
                    <Input className="border-2" id="squallForce" name="squallForce" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squallDirection">Direction (°d)</Label>
                    <Input
                    className="border-2"
                      id="squallDirection"
                      name="squallDirection"
                      type="number"
                      min="0"
                      max="360"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squallTime">Time (qt)</Label>
                    <Input className="border-2" id="squallTime" name="squallTime" onChange={handleChange} />
                  </div>

                  
                </CardContent>
              </Card>
            </TabsContent>
            {/* VV Tab */}
            <TabsContent value="V.V" className="mt-4">
              <Card>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="horizontalVisibility">Horizontal Visibility</Label>
                    <Input className="border-2" id="horizontalVisibility" name="horizontalVisibility" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="miscMeteors">Misc Meteors(Code)</Label>
                    <Input className="border-2" id="miscMeteors" name="miscMeteors" onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Weather Tab */}
            {/* Weather Tab */}
            <TabsContent value="weather" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="past" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="past">Past</TabsTrigger>
                      <TabsTrigger value="present">Present</TabsTrigger>
                    </TabsList>

                    {/* Past Weather */}
                    <TabsContent value="past" className="mt-4">
                      <Tabs defaultValue="w1" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="w1">W1</TabsTrigger>
                          <TabsTrigger value="w2">W2</TabsTrigger>
                        </TabsList>

                        {/* W1 Past Weather */}
                        <TabsContent value="w1" className="mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="pastWeatherW1">Past Weather (W1)</Label>
                            <Input
                            className="border-2"
                              id="pastWeatherW1"
                              name="pastWeatherW1"
                              placeholder="Enter past weather code (0-9)"
                              onChange={handleChange}
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
                            className="border-2"
                              id="pastWeatherW2"
                              name="pastWeatherW2"
                              placeholder="Enter past weather code (0-9)"
                              onChange={handleChange}
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
                        <TabsList className="grid w-full grid-cols-1">
                          <TabsTrigger value="ww">WW</TabsTrigger>
                        </TabsList>

                        {/* WW Present Weather */}
                        <TabsContent value="ww" className="mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="presentWeatherWW">Present Weather (WW)</Label>
                            <Input
                            className="border-2"
                              id="presentWeatherWW"
                              name="presentWeatherWW"
                              placeholder="Enter present weather code (00-99)"
                              onChange={handleChange}
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
            <TabsContent value="indicators" className="mt-4">
              <Card>
                <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="c2Indicator">C2: 2nd Card Indicator</Label>
                    <Input className="border-2" id="c2Indicator" name="c2Indicator" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observationTime">GG: Time of Observation (UTC)</Label>
                    <Input className="border-2" id="observationTime" name="observationTime" type="time" onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit Data</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
