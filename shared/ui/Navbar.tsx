"use client";

/*
TODO(shared/ux):
- Заменить <img> на next/image для оптимизации LCP и предупреждения no-img-element. (выполнено)
- Избежать синхронного setState в useEffect (react-hooks/set-state-in-effect). (выполнено)
- Вынести логику темы в отдельный useTheme хук для переиспользования. (выполнено)
*/

import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "next/image";
import image from "@/app/icon.png"

export default function Navbar() {

    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    function toggleTheme() {
        setIsDark((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle("dark", next);
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    }

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const next =
            stored === "dark" ||
            (stored !== "light" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        setMounted(true);
    }, []);

    if (!mounted) return null; // или скрыть только theme-toggle

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/history", label: "History" },
    ];

    // TODO(профиль-mvp): показать компактный профиль (имя + дневная цель)
    // из localStorage по ключу "focusreset:profile:v1".

    return (
        <header className="w-full sticky top-0 z-20 bg-background-light dark:bg-background-dark shadow-md">
            <div className="max-w-300 mx-auto">
                <div className="relative">
                    <div className="m-auto flex w-full items-center justify-between p-5">
                        <div className="flex items-center gap-2">
                            <div className="size-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                                <Image src={image} alt="Logo" className="w-15 h-10" />
                            </div>
                            <span className="font-bold text-[18px] text-slate-500 dark:text-white">Focus Reset</span>
                        </div>

                        <div className="flex gap-5 items-center">
                            <nav className="hidden items-center gap-4 md:flex">
                                {navLinks.map((link) => (
                                    <Link key={link.href} className="text-[16px] text-slate-500 font-medium dark:text-white" href={link.href}>
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="relative inline-flex h-7 w-12 items-center rounded-full border border-primary bg-white/70 p-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-primary/30 dark:bg-background-dark"
                                    onClick={toggleTheme}
                                    aria-pressed={isDark}
                                    aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                                >
                                    <span
                                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[14px] text-primary shadow transition-all duration-200 ${isDark
                                            ? "translate-x-5 bg-background-dark text-white shadow-[0_8px_18px_rgba(16,25,34,0.45)]"
                                            : "translate-x-0 shadow-[0_6px_14px_rgba(16,25,34,0.25)]"
                                            }`}
                                    />
                                </button>

                                <button
                                    type="button"
                                    className="inline-flex size-10 items-center justify-center rounded-md border border-primary/20 bg-white/70 text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-primary/30 dark:bg-background-dark md:hidden"
                                    aria-expanded={menuOpen}
                                    aria-controls="mobile-nav"
                                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                                    onClick={() => setMenuOpen((prev) => !prev)}
                                >
                                    <span className="relative block h-4 w-5">
                                        <span
                                            className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
                                        />
                                        <span
                                            className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
                                        />
                                        <span
                                            className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                                        />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <nav
                    id="mobile-nav"
                    className={`md:hidden bg-background-light  shadow-lg dark:bg-background-dark border border-primary/10 transition-all duration-200 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"} overflow-hidden`}
                >
                    <div className="flex flex-col gap-2 px-5 py-3 pb-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                className="rounded-md px-2 py-2 text-[16px] text-slate-500 font-medium dark:text-white"
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
