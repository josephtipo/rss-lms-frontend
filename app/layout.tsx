import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RSS Server Dashboard",
  description: "Cloud-Based Web Application Assessment 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <Navbar />

        <main className="min-h-screen bg-slate-100">
          <div className="mx-auto max-w-7xl px-6 py-8">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}