"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noNavbarRoutes = ["/login", "/signup", "/verifyemail"];

  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
