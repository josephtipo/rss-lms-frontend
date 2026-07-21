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

        <main className="flex-1 mx-auto w-full max-w-7xl p-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}