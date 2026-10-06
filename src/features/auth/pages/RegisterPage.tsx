"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useInput from "../../../hooks/useInput";
import {
  asyncSetIsAuthRegister,
  setIsAuthRegisterActionCreator,
} from "../states/action";
import { IconUser, IconMail, IconLock, IconLoader2, IconUserPlus } from "@tabler/icons-react";

function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAuthRegister = useAppSelector((state) => state.isAuthRegister);

  const [loading, setLoading] = useState(false);
  const [name, onChangeName, setName] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");

  // 1. Periksa apakah register telah selesai diproses
  useEffect(() => {
    if (isAuthRegister === true) {
      setLoading(false);
      dispatch(setIsAuthRegisterActionCreator(false));
      setName("");
      setEmail("");
      setPassword("");
      router.push("/auth/login");
    } else if (isAuthRegister === false) {
      setLoading(false);
    }
  }, [isAuthRegister, dispatch, setName, setEmail, setPassword, router]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await dispatch(asyncSetIsAuthRegister(name, email, password));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <div>
        <label
          htmlFor="register-name-input"
          className="block text-xs font-bold text-mauve-600 uppercase tracking-wider mb-1.5"
        >
          Nama Lengkap
        </label>
        <div className="relative">
          <IconUser
            aria-hidden="true"
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mauve-400"
          />
          <input
            type="text"
            id="register-name-input"
            data-testid="register-name-input"
            autoComplete="name"
            value={name}
            onChange={onChangeName}
            placeholder="Nama Lengkap Anda"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-mauve-200 text-sm placeholder-mauve-500 focus:outline-none focus:ring-2 focus:ring-blush-500/20 focus:border-blush-600 transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="register-email-input"
          className="block text-xs font-bold text-mauve-600 uppercase tracking-wider mb-1.5"
        >
          Alamat Email
        </label>
        <div className="relative">
          <IconMail
            aria-hidden="true"
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mauve-400"
          />
          <input
            type="email"
            id="register-email-input"
            data-testid="register-email-input"
            autoComplete="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="nama@email.com"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-mauve-200 text-sm placeholder-mauve-500 focus:outline-none focus:ring-2 focus:ring-blush-500/20 focus:border-blush-600 transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="register-password-input"
          className="block text-xs font-bold text-mauve-600 uppercase tracking-wider mb-1.5"
        >
          Kata Sandi
        </label>
        <div className="relative">
          <IconLock
            aria-hidden="true"
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mauve-400"
          />
          <input
            type="password"
            id="register-password-input"
            data-testid="register-password-input"
            autoComplete="new-password"
            value={password}
            onChange={onChangePassword}
            placeholder="Minimal 6 karakter"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-mauve-200 text-sm placeholder-mauve-500 focus:outline-none focus:ring-2 focus:ring-blush-500/20 focus:border-blush-600 transition-all"
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          data-testid="register-submit-button"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blush-500 to-lilac-400 hover:from-blush-600 hover:to-lilac-500 active:scale-[0.98] rounded-2xl shadow-md shadow-blush-500/30 transition-all disabled:opacity-60"
        >
          {loading ? (
            <>
              <IconLoader2 aria-hidden="true" size={18} className="animate-spin" />
              <span>Mendaftarkan Akun...</span>
            </>
          ) : (
            <>
              <IconUserPlus aria-hidden="true" size={18} stroke={2.5} />
              <span>Daftar Akun</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default RegisterPage;