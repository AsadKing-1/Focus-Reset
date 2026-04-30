

import "@/styles/globals.css";
import { Noto_Serif, Source_Sans_3 } from "next/font/google";

import Navbar from "@/shared/ui/Navbar";

export const metadata = {
  title: "Focus Reset - Home Check-in",
  icons: { icon: "/icon.png" },
};

const sourceSans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  variable: "--font-source-sans",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-serif",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${notoSerif.variable}`}>
      <body className={`${sourceSans.className} calm-background min-h-screen transition-all duration-300 relative overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
