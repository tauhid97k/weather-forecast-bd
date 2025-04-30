"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Eye,
  Download,
  Calendar,
} from "lucide-react";

// Define the type for our weather data
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

// Sample data from the JSON file
const weatherData: WeatherData[] = [
  {
    dataType: "10",
    stationNo: "12345",
    year: "25",
    month: "04",
    day: "17",
    measurements: [
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
    ],
    weatherRemark: "Good weather overall.",
    submittedAt: "2025-04-17T10:00:38.894Z",
  },
  {
    dataType: "10",
    stationNo: "12345",
    year: "25",
    month: "04",
    day: "17",
    measurements: [
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
    ],
    weatherRemark: "Nice weather.",
    submittedAt: "2025-04-17T10:02:36.892Z",
  },
  {
    dataType: "12",
    stationNo: "12345",
    year: "25",
    month: "04",
    day: "30",
    measurements: [
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
    ],
    weatherRemark: "Hello, Good weather.",
    submittedAt: "2025-04-30T03:27:14.136Z",
  },
  {
    dataType: "12",
    stationNo: "34567",
    year: "89",
    month: "10",
    day: "11",
    measurements: [
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
    ],
    weatherRemark: "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
    submittedAt: "2025-04-30T03:33:23.033Z",
  },
  {
    dataType: "12",
    stationNo: "34567",
    year: "89",
    month: "01",
    day: "11",
    measurements: [
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
    ],
    weatherRemark: "gggggggggggggggggggg",
    submittedAt: "2025-04-30T03:40:21.728Z",
  },
  {
    dataType: "12",
    stationNo: "34567",
    year: "12",
    month: "12",
    day: "23",
    measurements: [
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "100",
      "100",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
      "10",
    ],
    weatherRemark: "good",
    submittedAt: "2025-04-30T03:46:36.266Z",
  },
  {
    dataType: "01",
    stationNo: "25634",
    year: "25",
    month: "04",
    day: "30",
    measurements: [
      "16",
      "19",
      "25",
      "29",
      "31",
      "37",
      "43",
      "49",
      "51",
      "57",
      "50",
      "69",
      "71",
      "55",
      "15",
      "17",
      "20",
      "23",
      "30",
      "32",
      "40",
    ],
    weatherRemark: "Good Weather",
    submittedAt: "2025-04-30T04:20:35.840Z",
  },
];

export default function WeatherDataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Format date for filtering (YYYY-MM-DD)
  const formatDateForFilter = (year: string, month: string, day: string) => {
    return `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // Filter data based on search term
  const filteredData = weatherData.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const date = formatDateForFilter(item.year, item.month, item.day);

    return (
      item.dataType.toLowerCase().includes(searchLower) ||
      item.stationNo.toLowerCase().includes(searchLower) ||
      date.includes(searchLower) ||
      item.weatherRemark.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get average of measurements
  const getAverageMeasurement = (measurements: string[]) => {
    const numericValues = measurements
      .map((m) => Number.parseFloat(m))
      .filter((m) => !isNaN(m));
    if (numericValues.length === 0) return "N/A";
    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    return (sum / numericValues.length).toFixed(1);
  };

  return (
    <Card className="w-full shadow-md border-t-4 border-t-blue-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-xl text-blue-700">
              Weather Data Records
            </CardTitle>
            <CardDescription>
              Viewing {filteredData.length} synoptic weather records
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search records..."
                className="pl-8 border-blue-200"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSearchTerm("")}>
                  All Records
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("04")}>
                  April Records
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("12345")}>
                  Station 12345
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Data Type</TableHead>
                <TableHead>Station</TableHead>
                <TableHead className="hidden md:table-cell">
                  Avg. Measurement
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Weather Remark
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Submitted
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((record, index) => (
                  <TableRow key={index} className="hover:bg-blue-50/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>
                          20{record.year}-{record.month}-{record.day}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.dataType === "01" ? "default" : "secondary"
                        }
                      >
                        {record.dataType}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.stationNo}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getAverageMeasurement(record.measurements)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                      {record.weatherRemark}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-500 text-sm">
                      {formatDate(record.submittedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Download Data"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No weather records found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} records
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
