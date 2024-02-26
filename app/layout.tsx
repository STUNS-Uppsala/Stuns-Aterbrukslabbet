import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { inter } from "@/app/fonts";

import "./globals.css";

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
      <body className={cn("bg-background h-full", inter.className)}>{children}</body>
    </html>
  );
}
