"use client";

import { ChangeEvent, createElement, useRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export default function FileUpload({
  onFileSelect,
  isLoading,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // reset value supaya upload file yang sama 2x tetap trigger onChange
    e.target.value = "";
  };

  return createElement(
    "div",
    { className: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm" },
    createElement(
      "div",
      { className: "flex items-center justify-between gap-4" },
      createElement(
        "div",
        null,
        createElement(
          "h2",
          { className: "text-sm font-semibold text-gray-700" },
          "Upload Data Siswa & Absensi"
        ),
        createElement(
          "p",
          { className: "text-xs text-gray-500 mt-1" },
          "File Excel (.xlsx) dengan sheet Master_Siswa & Log_Absensi"
        )
      ),
      createElement(
        "button",
        {
          onClick: () => inputRef.current?.click(),
          disabled: isLoading,
          className:
            "shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors",
        },
        isLoading ? "Memproses..." : "Pilih File"
      ),
      createElement("input", {
        ref: inputRef,
        type: "file",
        accept: ".xlsx,.xls",
        onChange: handleChange,
        className: "hidden",
      })
    ),
    error &&
      createElement(
        "p",
        {
          className:
            "text-xs text-red-600 mt-3 bg-red-50 border border-red-200 rounded p-2",
        },
        error
      )
  );
}