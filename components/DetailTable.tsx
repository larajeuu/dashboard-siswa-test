import type { DetailRow } from "@/lib/types";

interface DetailTableProps {
  rows: DetailRow[];
}

export default function DetailTable({ rows }: DetailTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-2 font-medium text-gray-600">Nama</th>
            <th className="text-left px-4 py-2 font-medium text-gray-600">Kelas</th>
            <th className="text-left px-4 py-2 font-medium text-gray-600">Gender</th>
            <th className="text-left px-4 py-2 font-medium text-gray-600">Nilai</th>
            <th className="text-left px-4 py-2 font-medium text-gray-600">Status Hari Ini</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                Tidak ada data untuk filter yang dipilih
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2">{row.nama}</td>
                <td className="px-4 py-2">{row.kelas}</td>
                <td className="px-4 py-2">{row.gender}</td>
                <td className="px-4 py-2">{row.nilai}</td>
                <td className="px-4 py-2">{row.statusHariIni}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}