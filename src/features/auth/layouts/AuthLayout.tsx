"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import apiHelper from "../../../helpers/apiHelper";
import { asyncSetProfile, setIsProfile } from "../../users/states/action";
import { IconFlower, IconSparkles, IconHeart } from "@tabler/icons-react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const profile = useAppSelector((state) => state.profile);
  const isProfile = useAppSelector((state) => state.isProfile);

  useEffect(() => {
    const authToken = apiHelper.getAccessToken();
    if (authToken) {
      dispatch(asyncSetProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isProfile) {
      dispatch(setIsProfile(false));
      if (profile) {
        router.push("/");
      }
    }
  }, [isProfile, profile, dispatch, router]);

  const isLoginActive = pathname === "/auth/login";

  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blush-200/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-lilac-200/60 blur-3xl" />
      <IconSparkles aria-hidden="true" size={28} className="absolute top-16 right-[18%] text-blush-300 hidden sm:block" />
      <IconHeart aria-hidden="true" size={22} className="absolute bottom-24 left-[14%] text-lilac-300 hidden sm:block" />

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-tr from-blush-400 to-lilac-400 items-center justify-center text-white shadow-xl shadow-blush-400/40 ring-4 ring-white mb-3">
          <IconFlower aria-hidden="true" size={34} stroke={1.8} />
        </div>
        <h1 className="text-4xl font-semibold italic text-blush-700 tracking-tight">
          Bloomy Post
        </h1>
        <p className="mt-1 text-sm text-mauve-600">
          Tempat berbagi cerita manis & momen favoritmu ✿
        </p>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white/90 backdrop-blur py-8 px-6 sm:px-10 shadow-petal rounded-[2rem] border border-blush-100">
          <div className="flex rounded-full bg-blush-50 border border-blush-100 p-1 mb-6">
            <Link
              href="/auth/login"
              className={`flex-1 py-2 text-center text-sm font-semibold rounded-full transition-all ${
                isLoginActive
                  ? "bg-white text-blush-700 shadow-sm"
                  : "text-mauve-600 hover:text-mauve-900"
              }`}
            >
              Masuk Akun
            </Link>
            <Link
              href="/auth/register"
              className={`flex-1 py-2 text-center text-sm font-semibold rounded-full transition-all ${
                !isLoginActive
                  ? "bg-white text-blush-700 shadow-sm"
                  : "text-mauve-600 hover:text-mauve-900"
              }`}
            >
              Daftar Baru
            </Link>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;