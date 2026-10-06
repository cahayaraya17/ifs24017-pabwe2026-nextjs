import Link from "next/link";
import { IconMoodSad, IconArrowLeft } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-blush-500/10 border border-blush-200/60 text-center">
        <div className="inline-flex w-16 h-16 rounded-3xl bg-blush-100 text-blush-600 items-center justify-center mb-6 shadow-sm border border-blush-200">
          <IconMoodSad size={36} stroke={2.2} />
        </div>

        <div>
          <span className="inline-block px-3.5 py-1 bg-blush-100 text-blush-800 font-bold text-xs rounded-full uppercase tracking-wider mb-3 border border-blush-200">
            Error 404
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold italic text-blush-700 tracking-tight mb-2">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-mauve-600 text-sm mb-8 leading-relaxed">
          Maaf, halaman atau rute yang Anda tuju tidak tersedia atau telah dipindahkan.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-3xl bg-gradient-to-r from-blush-500 to-lilac-400 hover:from-blush-600 hover:to-lilac-500 text-white font-bold text-sm shadow-lg shadow-blush-500/25 transition-all transform active:scale-95"
        >
          <IconArrowLeft size={18} stroke={2.5} />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
