"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import image from "@/app/icon.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement | null>(null);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/history", label: "History" },
    ];

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;

        const handlePointerDownOutside = (event: PointerEvent) => {
            const target = event.target as Node;
            if (headerRef.current && !headerRef.current.contains(target)) {
                setMenuOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("pointerdown", handlePointerDownOutside);
        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("pointerdown", handlePointerDownOutside);
            window.removeEventListener("keydown", handleEscape);
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header ref={headerRef} className="max-w-300 w-full m-auto top-3 px-5 z-30 sticky">
            <div className="rounded-full bg-(--bg-800) shadow-md">
                <div className="max-w-280 mx-auto">
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
                                className="inline-flex size-10 items-center justify-center rounded-md bg-(--bg-700) border-gradient transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:hidden"
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
                aria-hidden={!menuOpen}
                className={`md:hidden absolute left-5 right-5 top-full mt-2 rounded-2xl bg-(--bg-800) shadow-lg transition-all duration-200 ${
                    menuOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
                }`}
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
        </header>
    );
}
