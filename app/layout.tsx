import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/shared/ui/Navbar";
import FloatingLines from "@/shared/ui/Floating_Lines_bg";

export const metadata = {
  title: "Focus Reset - Home Check-in",
  icons: { icon: "/icon.png" },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} gradient-bg min-h-screen transition-all duration-300 relative overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <FloatingLines
            interactive={false}
            parallax={false}
            animationSpeed={0.55}
            lineCount={[12, 10, 8]}
            lineDistance={[7, 9, 11]}
            linesGradient={["#7C3AED", "#A855F7", "#C084FC", "#FB923C", "#F97316"]}
            mixBlendMode="screen"
          />
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
