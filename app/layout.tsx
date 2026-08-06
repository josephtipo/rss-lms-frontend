import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "RSS Server Dashboard",
  description:
    "Cloud-Based Web Application Assessment 2 backend, API and database implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <Header />
          <Navbar />

          <main className="min-h-screen flex-1 bg-white transition-colors duration-300 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-6 py-8">
              {children}
            </div>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}