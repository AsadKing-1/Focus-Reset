import "@/styles/globals.css";

import { Inter } from "next/font/google";

export const metadata = {
  title: "Focus Reset - Home Check-in",
  icons: { icon: "/icon.png" },
};

const inter = Inter({ subsets: ["latin"] });

import Navbar from "@/shared/ui/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} gradient-bg min-h-screen transition-all duration-300 flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
