"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ChartCard from "@/components/ChartCard";
import type { ChartDatum } from "@/lib/types";

interface GenderChartProps {
  data: ChartDatum[];
}

const COLORS = ["#3b82f6", "#ec4899"];

export default function GenderChart({ data }: GenderChartProps) {
  return (
    <ChartCard title="Distribusi Gender" isEmpty={data.length === 0}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => `${entry.label}: ${entry.value}`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}