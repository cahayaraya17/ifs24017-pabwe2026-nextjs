"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconUsers,
  IconUserCircle,
  IconChevronRight,
  IconSparkles,
} from "@tabler/icons-react";

function SidebarComponent({ isSidebarOpen, onCloseMobile }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Semua Postingan",
      icon: IconLayoutDashboard,
      end: true,
    },
    {
      href: "/users",
      label: "Daftar Pengguna",
      icon: IconUsers,
      end: false,
    },
    {
      href: "/profile",
      label: "Profil Saya",
      icon: IconUserCircle,
      end: false,
    },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          data-testid="sidebar-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-mauve-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-white/80 backdrop-blur border-r border-blush-100 p-4 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-6">
            <div>
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-mauve-600">
                Menu Utama
              </p>
              <nav aria-label="Menu utama" className="mt-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.end
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blush-500 to-lilac-400 text-white shadow-md shadow-blush-400/30 font-semibold"
                          : "text-mauve-600 hover:text-mauve-900 hover:bg-blush-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          aria-hidden="true"
                          size={20}
                          className={
                            isActive
                              ? "text-white"
                              : "text-mauve-400 group-hover:text-mauve-600"
                          }
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <IconChevronRight aria-hidden="true" size={16} />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-3 rounded-3xl bg-gradient-to-br from-blush-100 to-lilac-100 border border-blush-200/60">
            <div className="flex items-center gap-2 text-blush-800">
              <IconSparkles aria-hidden="true" size={16} />
              <p className="text-xs font-semibold">Bagikan hal manis hari ini ✿</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SidebarComponent;