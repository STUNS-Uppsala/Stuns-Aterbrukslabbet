import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Återbrukslabbet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background", inter.className)}>{children}</body>
    </html>
  );
}
