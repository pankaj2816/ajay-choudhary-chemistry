import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { ToastProvider } from "@/context/ToastContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajay Choudhary | Chemistry Teacher | Organic & Inorganic Specialist",
  description: "Official teaching platform of Ajay Choudhary, an experienced Chemistry educator with 8+ years of expertise across 3 coaching centers. Access study materials, question papers, verified solutions, and notice board updates.",
  keywords: [
    "Ajay Choudhary Chemistry",
    "Chemistry Teacher",
    "Organic Chemistry",
    "Inorganic Chemistry",
    "Practical Chemistry",
    "CBSE Class 11 Chemistry",
    "CBSE Class 12 Chemistry",
    "JEE Chemistry Notes",
    "NEET Chemistry Question Papers",
    "Qualitative Salt Analysis"
  ],
  authors: [{ name: "Ajay Choudhary" }],
  creator: "Ajay Choudhary",
  openGraph: {
    title: "Ajay Choudhary | Senior Chemistry Educator",
    description: "Master Chemistry with 8+ Years Experienced Educator Ajay Choudhary. Free Question Papers, Verified Solutions & Notes.",
    type: "website",
    locale: "en_US",
    siteName: "Ajay Choudhary Chemistry Platform"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} font-sans`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
        <ToastProvider>
          <AnnouncementBanner />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
