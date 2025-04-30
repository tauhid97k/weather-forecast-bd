"use client";

import { useState } from "react";

import SynopticCodeForm from "./synoptic-code-form";
import WeatherDataTable from "./weatherdatatable";

export default function WeatherTabsPage() {
  const [activeTab, setActiveTab] = useState<"weather" | "synoptic">("weather");

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-800 text-center">
        Weather Data Management System
      </h1>

      {/* Tab Headers */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 font-medium rounded-t-lg border-b-2 ${
            activeTab === "weather"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("weather")}
        >
          Weather Data
        </button>
        <button
          className={`ml-4 px-6 py-2 font-medium rounded-t-lg border-b-2 ${
            activeTab === "synoptic"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("synoptic")}
        >
          Synoptic Code
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded-lg shadow">
        {activeTab === "weather" && <WeatherDataTable />}
        {activeTab === "synoptic" && <SynopticCodeForm />}
      </div>
    </main>
  );
}
