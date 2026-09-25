
// @ts-expect-error: xlsx may be provided without bundled type declarations.
import * as XLSX from "xlsx";
import type { AttendanceLog, AttendanceStatus, DashboardData, Student } from "./types";

const REQUIRED_SHEETS = ["Master_Siswa", "Log_Absensi"] as const;

export class ExcelParseError extends Error {}

export async function parseExcelFile(file: File): Promise<DashboardData> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array", cellDates: true });

  for (const sheetName of REQUIRED_SHEETS) {
    if (!workbook.SheetNames.includes(sheetName)) {
      throw new ExcelParseError(`Sheet "${sheetName}" tidak ditemukan di file Excel.`);
    }
  }

  const masterRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    workbook.Sheets["Master_Siswa"],
    { defval: "" }
  );
  const logRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    workbook.Sheets["Log_Absensi"],
    { defval: "" }
  );

  return {
    students: masterRows.map(mapToStudent),
    logs: logRows.map(mapToLog),
  };
}

function mapToStudent(row: Record<string, unknown>): Student {
  return {
    id: String(row["ID Siswa"]).trim(),
    nama: String(row["Nama Siswa"]).trim(),
    kelas: String(row["Kelas"]).trim(),
    gender: String(row["Jenis Kelamin"]).trim() as Student["gender"],
    nilai: Number(row["Nilai"]) || 0,
    mapelFavorit: String(row["Mata Pelajaran Favorit"]).trim(),
    ekskul: String(row["Ekstrakurikuler"]).trim(),
  };
}

function mapToLog(row: Record<string, unknown>): AttendanceLog {
  return {
    logId: row["Log ID"] as string | number,
    tanggal: normalizeDate(row["Tanggal"]),
    jam: String(row["Jam"]),
    siswaId: String(row["ID Siswa"]).trim(),
    kelas: String(row["Kelas"]).trim(),
    status: String(row["Status Kehadiran"]).trim() as AttendanceStatus,
  };
}

function normalizeDate(value: unknown): string {
  let d: Date;
  if (value instanceof Date) {
    d = value;
  } else if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    d = new Date(parsed.y, parsed.m - 1, parsed.d);
  } else {
    d = new Date(String(value));
  }
  if (isNaN(d.getTime())) return String(value);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}