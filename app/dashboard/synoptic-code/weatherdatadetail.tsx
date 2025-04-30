"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeatherData {
  dataType: string;
  stationNo: string;
  year: string;
  month: string;
  day: string;
  measurements: string[];
  weatherRemark: string;
  submittedAt: string;
}

interface WeatherDataDetailProps {
  data: WeatherData;
}

export function WeatherDataDetail({ data }: WeatherDataDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date);
  };

  // Measurement labels (simplified for this component)
  const measurementLabels = [
    "C1",
    "Iliii",
    "iRiXhvv",
    "Nddff",
    "ISnTTT",
    "2SnTdTdTd",
    "3P.P.P.P/4PPPP",
    "6RRRtR",
    "7wwW1W2",
    "8NhClCmC11",
    "2SnInInIn/InInInIn",
    "56DLDMDH",
    "57CDaEc",
    "Avg. Total Cloud",
    "C2",
    "GG",
    "58P24P24P24/59P24P24P24",
    "6RRRtR/7R24R24R24",
    "8N5Ch5h5",
    "90dqqqt",
    "91fqfqfq",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="View Details">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Weather Record Details
            <Badge variant={data.dataType === "01" ? "default" : "secondary"}>
              Type {data.dataType}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Data Type</p>
                  <p className="font-medium">{data.dataType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Station Number</p>
                  <p className="font-medium">{data.stationNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    20{data.year}-{data.month}-{data.day}
                  </p>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <p className="text-sm text-gray-500">Submitted At</p>
                  <p className="font-medium">{formatDate(data.submittedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Measurements */}
          <Card className="border-green-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                Measurements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.measurements.map((measurement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-md bg-green-50/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {measurementLabels[index]}
                      </p>
                    </div>
                    <div className="font-mono bg-white px-2 py-1 rounded border border-green-200">
                      {measurement}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Remark */}
          <Card className="border-amber-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-amber-700 mb-2">
                Weather Remark
              </h3>
              <p className="p-3 bg-amber-50 rounded-md">{data.weatherRemark}</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
