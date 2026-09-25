import { createElement, ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  isEmpty?: boolean;
}

export default function ChartCard({ title, children, isEmpty }: ChartCardProps) {
  return createElement(
    "div",
    { className: "bg-white rounded-lg border border-gray-200 p-4 shadow-sm" },
    createElement(
      "h3",
      { className: "text-sm font-semibold text-gray-700 mb-3" },
      title,
    ),
    isEmpty
      ? createElement(
          "div",
          { className: "flex items-center justify-center h-48 text-sm text-gray-400" },
          "Belum ada data",
        )
      : children,
  );
}