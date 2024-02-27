import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { inter } from "@/app/fonts";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-background", inter.className)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
