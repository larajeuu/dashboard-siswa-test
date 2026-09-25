"use client";

import { ChangeEvent } from "react";
import type { Filters } from "@/lib/types";

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  kelasOptions: string[];
  tanggalOptions: string[];
}

export default function FilterBar({
  filters,
  onFilterChange,
  kelasOptions,
  tanggalOptions,
}: FilterBarProps) {
  // Helper generik biar gak nulis handler terpisah untuk tiap field
  const updateField = (field: keyof Filters) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onFilterChange({ ...filters, [field]: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-wrap gap-3">
      <select
        value={filters.kelas}
        onChange={updateField("kelas")}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5"
      >
        <option value="all">Semua Kelas</option>
        {kelasOptions.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      <select
        value={filters.tanggal}
        onChange={updateField("tanggal")}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5"
      >
        <option value="all">Semua Tanggal</option>
        {tanggalOptions.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={filters.gender}
        onChange={updateField("gender")}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5"
      >
        <option value="all">Semua Gender</option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>

      <select
        value={filters.status}
        onChange={updateField("status")}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5"
      >
        <option value="all">Semua Status</option>
        <option value="Hadir">Hadir</option>
        <option value="Izin">Izin</option>
        <option value="Sakit">Sakit</option>
        <option value="Alfa">Alfa</option>
      </select>

      <input
        type="text"
        placeholder="Cari nama siswa..."
        value={filters.search}
        onChange={updateField("search")}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5 flex-1 min-w-[160px]"
      />
    </div>
  );
}