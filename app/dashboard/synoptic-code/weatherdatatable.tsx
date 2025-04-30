"use client";

import { useState, useEffect } from "react";
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
  Download,
  Calendar,
  Loader2,
} from "lucide-react";
import { DateRangePicker } from "@/components/date-range-picker";
import type { DateRange } from "react-day-picker";
import { WeatherDataDetail } from "./weather-data-detail";
import type { WeatherData } from "./app/api/weather-data/route";

export default function WeatherDataTable() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
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

  // Format date from year, month, day fields
  const formatRecordDate = (year: string, month: string, day: string) => {
    return `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (dateRange?.from) {
        const startDate = dateRange.from.toISOString().split("T")[0];
        params.append("startDate", startDate);
      }
      if (dateRange?.to) {
        const endDate = dateRange.to.toISOString().split("T")[0];
        params.append("endDate", endDate);
      }

      const response = await fetch(`/api/weather-data?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const result = await response.json();
      setWeatherData(result.data);
      setTotalRecords(result.data.length);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial load and when filters change
  useEffect(() => {
    fetchData();
  }, [searchTerm, dateRange]);

  // Get average of measurements
  const getAverageMeasurement = (measurements: string[]) => {
    const numericValues = measurements
      .map((m) => Number.parseFloat(m))
      .filter((m) => !isNaN(m));
    if (numericValues.length === 0) return "N/A";
    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    return (sum / numericValues.length).toFixed(1);
  };

  // Pagination
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = weatherData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setDateRange(undefined);
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
              {loading
                ? "Loading records..."
                : `Viewing ${totalRecords} synoptic weather records`}
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search records..."
                className="pl-8 border-blue-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => clearFilters()}>
                  Clear All Filters
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

        {/* Date Range Picker */}
        <div className="mt-4">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-500">Loading weather data...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <>
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
                              {formatRecordDate(
                                record.year,
                                record.month,
                                record.day
                              )}
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
                            <WeatherDataDetail data={record} />
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
            {totalRecords > itemsPerPage && (
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, totalRecords)} of{" "}
                  {totalRecords} records
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
