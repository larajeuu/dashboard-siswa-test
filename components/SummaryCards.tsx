import type { SummaryStats } from "@/lib/types";

interface SummaryCardsProps {
  summary: SummaryStats;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    { label: "Total Siswa", value: summary.totalSiswa, color: "text-blue-600" },
    { label: "Hadir", value: summary.hadir, color: "text-green-600" },
    { label: "Tidak Hadir", value: summary.tidakHadir, color: "text-red-600" },
    { label: "Rata-rata Nilai", value: summary.rataNilai, color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className={`text-2xl font-bold mt-1 ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}