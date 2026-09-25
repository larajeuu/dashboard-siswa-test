// hooks/useDashboardData.ts
"use client";

import { useState, useMemo, useCallback } from "react";
import { parseExcelFile } from "../lib/excelParser";
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

  // ── Logic inti: parse File lalu update state ────────────────
  const processFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const { students: parsedStudents, logs: parsedLogs } =
        await parseExcelFile(file);
      setStudents(parsedStudents);
      setLogs(parsedLogs);
      setFilters(initialFilters);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal membaca file Excel"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadFile = useCallback(
    (file: File) => processFile(file),
    [processFile]
  );

  const loadSampleData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(SAMPLE_FILE_PATH);
      if (!res.ok) {
        throw new Error(`Gagal mengambil file sample (status ${res.status})`);
      }
      const blob = await res.blob();
      const file = new File([blob], "sample-data.xlsx", { type: blob.type });
      await processFile(file);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat data sample"
      );
      setIsLoading(false);
    }
  }, [processFile]);

  // ── Opsi dropdown filter ─────────────────────────────────────
  const kelasOptions = useMemo(() => getUniqueKelas(students), [students]);
  const tanggalOptions = useMemo(() => getUniqueDates(logs), [logs]);

  // ── Data terfilter ────────────────────────────────────────────
  const filteredStudents = useMemo(
    () =>
      filterStudents(students, {
        kelas: filters.kelas,
        gender: filters.gender,
        search: filters.search,
      }),
    [students, filters.kelas, filters.gender, filters.search]
  );

  const filteredLogs = useMemo(
    () =>
      filterLogs(logs, {
        tanggal: filters.tanggal,
        status: filters.status,
        studentIds: filteredStudents.map((s) => s.id),
      }),
    [logs, filters.tanggal, filters.status, filteredStudents]
  );

  // ── Data siap pakai untuk komponen tampilan ──────────────────
  const summary = useMemo(
    () => computeSummary(filteredStudents, filteredLogs),
    [filteredStudents, filteredLogs]
  );
  const attendanceChartData = useMemo(
    () => computeAttendanceChart(filteredLogs),
    [filteredLogs]
  );
  const genderChartData = useMemo(
    () => computeGenderChart(filteredStudents),
    [filteredStudents]
  );
  const gradeChartData = useMemo(
    () => computeGradeDistribution(filteredStudents),
    [filteredStudents]
  );
  const favoriteSubjectChartData = useMemo(
    () => computeFavoriteSubjects(filteredStudents),
    [filteredStudents]
  );
  const extracurricularChartData = useMemo(
    () => computeExtracurricular(filteredStudents),
    [filteredStudents]
  );
  const detailTableRows = useMemo(
    () => buildDetailTable(filteredStudents, filteredLogs),
    [filteredStudents, filteredLogs]
  );

  const hasData = students.length > 0;

  return {
    isLoading,
    error,
    hasData,
    loadFile,
    loadSampleData,
    setFilters,
    filters,
    kelasOptions,
    tanggalOptions,
    summary,
    attendanceChartData,
    genderChartData,
    gradeChartData,
    favoriteSubjectChartData,
    extracurricularChartData,
    detailTableRows,
  };
}