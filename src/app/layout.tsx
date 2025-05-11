import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthModel from "@/components/client-components/AuthModel";
import LeftSidebar from "@/components/LeftSidebar";
import RightSection from "@/components/RightSection";
// import AuthListener from "@/components/client-components/AuthListener";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X clone",
  description: "X clone made using NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="w-full h-full flex justify-center items-center relative ">
          <div className="max-w-screen-xl w-full h-full flex relative">
            <AuthModel />
            {/* <AuthListener /> */}

            <LeftSidebar />
            <Toaster />
            {children}
            <RightSection />
          </div>
        </div>
        <Navbar />
      </body>
    </html>
  );
}
