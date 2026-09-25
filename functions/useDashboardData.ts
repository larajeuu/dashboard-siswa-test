// hooks/useDashboardData.ts
"use client";

import { useState, useMemo, useCallback } from "react";
import {
  getUniqueDates,
  getUniqueKelas,
  filterStudents,
  filterLogs,
  computeSummary,
  computeAttendanceChart,
  computeGenderChart,
  computeGradeDistribution,
  computeFavoriteSubjects,
  computeExtracurricular,
  buildDetailTable,
} from "../lib/dataProcessor";
import type { Student, AttendanceLog, Filters } from "../lib/types";

const initialFilters: Filters = {
  kelas: "all",
  tanggal: "all",
  gender: "all",
  status: "all",
  search: "",
};

const SAMPLE_FILE_PATH =
  "/sample-data/Master_Data_Dashboard_Siswa_Log_Absensi.xlsx";

export function useDashboardData() {
  // ── Raw data (source of truth) ──────────────────────────────
  const [students, setStudents] = useState<Student[]>([]);
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
}