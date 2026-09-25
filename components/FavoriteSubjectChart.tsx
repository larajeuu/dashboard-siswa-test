"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "@/components/ChartCard";
import type { ChartDatum } from "@/lib/types";

interface FavoriteSubjectChartProps {
  data: ChartDatum[];
}

export default function FavoriteSubjectChart({
  data,
}: FavoriteSubjectChartProps) {
  return (
    <ChartCard title="Mata Pelajaran Favorit" isEmpty={data.length === 0}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="label"
            width={100}
            tick={{ fontSize: 11 }}
          />
          <Tooltip />
          <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}