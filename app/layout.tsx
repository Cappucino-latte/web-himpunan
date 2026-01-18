import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Import font coding
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "HIMATIKA UNU Yogyakarta",
  description: "Organisasi Mahasiswa Informatika Universitas Nahdlatul Ulama Yogyakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${mono.variable} antialiased bg-black text-white`}>
        {/* Navbar bisa dipasang di sini nanti */}
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}