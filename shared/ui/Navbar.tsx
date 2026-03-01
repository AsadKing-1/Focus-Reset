"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import image from "@/app/icon.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/history", label: "History" },
    ];
    return (
        <header className="max-w-280 w-full m-auto sticky top-3 px-5 rounded-full z-20 border border-white/10 bg-background-dark/80 backdrop-blur-md shadow-md">
            <div className="max-w-280 mx-auto">
                <div className="relative">
                    <div className="m-auto flex w-full items-center justify-between p-5">
                        <div className="flex items-center gap-2">
                            <div className="size-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                                <Image src={image} alt="Logo" className="w-15 h-10" />
                            </div>
                            <span className="font-bold text-[18px] text-white">Focus Reset</span>
                        </div>

                        <div className="flex gap-5 items-center">
                            <nav className="hidden items-center gap-4 md:flex">
                                {navLinks.map((link) => (
                                    <Link key={link.href} className="text-[16px] text-white/90 font-medium transition-colors hover:text-white" href={link.href}>
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <button
                                type="button"
                                className="inline-flex size-10 items-center justify-center rounded-md border border-primary/30 bg-background-dark text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:hidden"
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

                <nav
                    id="mobile-nav"
                    className={`md:hidden border border-primary/20 bg-background-dark/95 backdrop-blur-md shadow-lg transition-all duration-200 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"} overflow-hidden`}
                >
                    <div className="flex flex-col gap-2 px-5 py-3 pb-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                className="rounded-md px-2 py-2 text-[16px] text-white/90 font-medium transition-colors hover:text-white"
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
