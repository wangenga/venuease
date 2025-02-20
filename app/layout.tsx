import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Comp/Navbar";
import RegisterModal from "./Comp/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./Comp/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VenuEase",
  description: "A Web-Based Venue Booking and Management Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <main>{children}</main> 
      </body>
    </html>
  );
}
