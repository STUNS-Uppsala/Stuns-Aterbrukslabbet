import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { inter } from "@/app/fonts";
import { svSE } from "@clerk/localizations";

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
    <ClerkProvider localization={svSE}>
      <html lang="en">
        <body className={cn("bg-background", inter.className)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
