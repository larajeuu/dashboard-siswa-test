// app/page.tsx
"use client";

import { useState } from "react";

type DashboardSummary = {
  fileName?: string;
  rowCount: number;
  columns: string[];
};

function useDashboardData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  const loadFile = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const rows = text.trim() ? text.trim().split(/\r?\n/) : [];
      const columns = rows[0]
        ? rows[0].split(",").map((column) => column.trim())
        : [];

      setSummary({ fileName: file.name, rowCount: Math.max(rows.length - 1, 0), columns });
    } catch {
      setError("File tidak dapat dibaca.");
      setSummary(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    setError(null);
    setSummary({
      fileName: "data-sample.csv",
      rowCount: 3,
      columns: ["Nama", "Kelas", "Kehadiran"],
    });
  };

  return {
    loadFile,
    loadSampleData,
    isLoading,
    error,
    hasData: summary !== null,
    summary,
  };
}

type FileUploadProps = {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  error?: string | null;
};

function FileUpload({ onFileSelect, isLoading, error }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Unggah file data siswa
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          disabled={isLoading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onFileSelect(file);
          }}
          className="mt-1 block w-full text-sm text-gray-600"
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

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