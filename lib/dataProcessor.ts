import type {
  AttendanceLog,
  ChartDatum,
  DetailRow,
  Filters,
  Student,
  SummaryStats,
} from "./types";

export function getUniqueDates(logs: AttendanceLog[]): string[] {
  return Array.from(new Set(logs.map((l) => l.tanggal))).sort();
}

export function getUniqueKelas(students: Student[]): string[] {
  return Array.from(new Set(students.map((s) => s.kelas))).sort();
}

export function filterStudents(
  students: Student[],
  filters: Pick<Filters, "kelas" | "gender" | "search">
): Student[] {
  const search = filters.search.trim().toLowerCase();
  return students.filter((s) => {
    if (filters.kelas !== "all" && s.kelas !== filters.kelas) return false;
    if (filters.gender !== "all" && s.gender !== filters.gender) return false;
    if (search && !s.nama.toLowerCase().includes(search)) return false;
    return true;
  });
}

export function filterLogs(
  logs: AttendanceLog[],
  params: { tanggal: string; status: string; studentIds: string[] }
): AttendanceLog[] {
  const idSet = new Set(params.studentIds);
  return logs.filter((l) => {
    if (params.tanggal !== "all" && l.tanggal !== params.tanggal) return false;
    if (params.status !== "all" && l.status !== params.status) return false;
    if (!idSet.has(l.siswaId)) return false;
    return true;
  });
}

export function computeSummary(
  filteredStudents: Student[],
  logsOnDate: AttendanceLog[]
): SummaryStats {
  const totalSiswa = filteredStudents.length;
  const hadir = logsOnDate.filter((l) => l.status === "Hadir").length;
  const tidakHadir = logsOnDate.filter((l) => l.status !== "Hadir").length;
  const rataNilai = totalSiswa
    ? filteredStudents.reduce((sum, s) => sum + s.nilai, 0) / totalSiswa
    : 0;

  return {
    totalSiswa,
    hadir,
    tidakHadir,
    rataNilai: Math.round(rataNilai * 10) / 10,
  };
}

export function computeAttendanceChart(logsOnDate: AttendanceLog[]): ChartDatum[] {
  const statuses = ["Hadir", "Izin", "Sakit", "Alfa"] as const;
  return statuses.map((status) => ({
    label: status,
    value: logsOnDate.filter((l) => l.status === status).length,
  }));
}

export function computeGenderChart(filteredStudents: Student[]): ChartDatum[] {
  const genders = ["Laki-laki", "Perempuan"] as const;
  return genders.map((g) => ({
    label: g,
    value: filteredStudents.filter((s) => s.gender === g).length,
  }));
}

export function computeGradeDistribution(filteredStudents: Student[]): ChartDatum[] {
  const buckets: { label: string; min: number; max: number }[] = [
    { label: "<60", min: -Infinity, max: 59 },
    { label: "60-74", min: 60, max: 74 },
    { label: "75-84", min: 75, max: 84 },
    { label: "85-100", min: 85, max: 100 },
  ];
  return buckets.map((b) => ({
    label: b.label,
    value: filteredStudents.filter((s) => s.nilai >= b.min && s.nilai <= b.max).length,
  }));
}

function countByField(students: Student[], field: "mapelFavorit" | "ekskul"): ChartDatum[] {
  const counts = new Map<string, number>();
  students.forEach((s) => {
    const key = s[field];
    if (!key) return;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export function computeFavoriteSubjects(filteredStudents: Student[]): ChartDatum[] {
  return countByField(filteredStudents, "mapelFavorit");
}

export function computeExtracurricular(filteredStudents: Student[]): ChartDatum[] {
  return countByField(filteredStudents, "ekskul");
}

export function buildDetailTable(
  filteredStudents: Student[],
  logsOnDate: AttendanceLog[]
): DetailRow[] {
  const statusMap = new Map(logsOnDate.map((l) => [l.siswaId, l.status]));
  return filteredStudents.map((s) => ({
    ...s,
    statusHariIni: statusMap.get(s.id) ?? "-",
  }));
}