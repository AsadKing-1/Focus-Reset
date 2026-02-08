"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "light") {
            const dark = stored === "dark";
            setIsDark(dark);
            document.documentElement.classList.toggle("dark", dark);
            return;
        }

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
    }, []);

    function toggleTheme() {
        setIsDark((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle("dark", next);
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/history", label: "History" },
        { href: "/settings", label: "Settings" },
    ];

    return (
        <>
            <header className={`sticky top-0 z-50 w-full bg-background-light dark:bg-background-dark ${menuOpen ? "shadow-none" : "shadow-md"} transition-all duration-300`} >
                <div className="m-auto flex w-full items-center justify-between p-5">
                    <div className="flex items-center gap-2">
                        <div className="size-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-xl">psychology_alt</span>
                        </div>
                        <span className="font-bold text-[18px] dark:text-white">Focus Reset</span>
                    </div>

                    <div className="flex gap-5 items-center">
                        <nav className="hidden items-center gap-4 md:flex">
                            {navLinks.map((link) => (
                                <Link key={link.href} className="text-[16px] dark:text-white" href={link.href}>
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
            </header>

            <nav
                id="mobile-nav"
                className={`md:hidden bg-background-light shadow-md dark:bg-background-dark border-t border-primary/10 transition-all duration-200 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"} overflow-hidden`}
            >
                <div className="flex flex-col gap-2 px-5 py-3 pb-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            className="rounded-md px-2 py-2 text-[16px] dark:text-white hover:bg-primary/10"
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}
