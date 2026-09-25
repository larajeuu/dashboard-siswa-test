// app/page.tsx
"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import FileUpload from "@/components/FileUpload";
import FilterBar from "@/components/FilterBar";
import SummaryCards from "@/components/SummaryCards";
import DetailTable from "@/components/DetailTable";
import ChartCard from "@/components/ChartCard";
import AttendanceChart from "@/components/charts/AttendanceChart";

export default function DashboardPage() {
  const {
    loadFile,
    loadSampleData,
    isLoading,
    error,
    hasData,
    filters,
    setFilters,
    kelasOptions,
    tanggalOptions,
    summary,
    attendanceChartData,
    genderChartData,
    detailTableRows,
  } = useDashboardData();

  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-800">
        Dashboard Siswa & Absensi
      </h1>

      <FileUpload onFileSelect={loadFile} isLoading={isLoading} error={error} />

      <button
        onClick={loadSampleData}
        disabled={isLoading}
        className="text-sm text-blue-600 underline hover:text-blue-800 disabled:text-gray-400"
      >
        Atau load data sample langsung
      </button>

      {hasData && (
        <>
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            kelasOptions={kelasOptions}
            tanggalOptions={tanggalOptions}
          />

          <SummaryCards summary={summary} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AttendanceChart data={attendanceChartData} />
          </div>

          <DetailTable rows={detailTableRows} />
        </>
      )}
    </main>
  );
}