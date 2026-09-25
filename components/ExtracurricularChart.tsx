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

interface ExtracurricularChartProps {
  data: ChartDatum[];
}

export default function ExtracurricularChart({
  data,
}: ExtracurricularChartProps) {
  return (
    <ChartCard title="Partisipasi Ekstrakurikuler" isEmpty={data.length === 0}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}