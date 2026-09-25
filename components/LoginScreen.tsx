"use client";

import { useState, FormEvent } from "react";

export type UserRole = "guru" | "siswa";

export interface LoggedInUser {
  role: UserRole;
  siswaId?: string; // cuma keisi kalau role === "siswa"
}

interface LoginScreenProps {
  onLogin: (user: LoggedInUser) => void;
}

// Password statis untuk demo — di aplikasi beneran ini HARUS di backend,
// bukan di kode frontend seperti ini.
const GURU_PASSWORD = "guru123";

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("guru");
  const [password, setPassword] = useState("");
  const [siswaId, setSiswaId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (selectedRole === "guru") {
      if (password !== GURU_PASSWORD) {
        setError("Password salah.");
        return;
      }
      onLogin({ role: "guru" });
    } else {
      const trimmedId = siswaId.trim();
      if (!trimmedId) {
        setError("ID Siswa wajib diisi.");
        return;
      }
      // Validasi apakah ID ini beneran ada di data BELUM bisa dilakukan
      // di sini, karena file Excel belum di-upload. Validasi sebenarnya
      // terjadi nanti di SiswaDashboard setelah data ke-load.
      onLogin({ role: "siswa", siswaId: trimmedId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 w-full max-w-sm space-y-4"
      >
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            Dashboard Siswa & Absensi
          </h1>
          <p className="text-xs text-gray-500 mt-1">Silakan masuk untuk melanjutkan</p>
        </div>

        {/* Role selector */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedRole("guru");
              setError(null);
            }}
            className={`flex-1 text-sm py-2 rounded-md border ${
              selectedRole === "guru"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            Guru
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole("siswa");
              setError(null);
            }}
            className={`flex-1 text-sm py-2 rounded-md border ${
              selectedRole === "siswa"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            Siswa
          </button>
        </div>

        {/* Form field kondisional sesuai role */}
        {selectedRole === "guru" ? (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Password Guru
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
              placeholder="Masukkan password"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              ID Siswa
            </label>
            <input
              type="text"
              value={siswaId}
              onChange={(e) => setSiswaId(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
              placeholder="Contoh: S001"
            />
          </div>
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-colors"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}