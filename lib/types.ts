export interface Student {
  id: string;
  nama: string;
  kelas: string;
  gender: "Laki-laki" | "Perempuan";
  nilai: number;
  mapelFavorit: string;
  ekskul: string;
}

export type AttendanceStatus = "Hadir" | "Izin" | "Sakit" | "Alfa";

export interface AttendanceLog {
  logId: string | number;
  tanggal: string; // format "YYYY-MM-DD"
  jam: string;
  siswaId: string;
  kelas: string;
  status: AttendanceStatus;
}

export interface DashboardData {
  students: Student[];
  logs: AttendanceLog[];
}

export interface Filters {
  tanggal: string;
  kelas: string; // "" berarti semua kelas
  gender: string;
  status: string;
  search: string;
}

export interface SummaryStats {
  totalSiswa: number;
  hadir: number;
  tidakHadir: number;
  rataNilai: number;
}

export interface ChartDatum {
  label: string;
  value: number;
}

export interface DetailRow extends Student {
  statusHariIni: string;
}