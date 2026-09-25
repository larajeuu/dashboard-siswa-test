// app/page.tsx
"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import FileUpload from "@/components/FileUpload";

export default function DashboardPage() {
  const { loadFile, loadSampleData, isLoading, error, hasData, summary } =
    useDashboardData();

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
        <pre className="bg-white border border-gray-200 rounded p-4 text-xs overflow-auto">
          {JSON.stringify(summary, null, 2)}
        </pre>
      )}
    </main>
  );
}