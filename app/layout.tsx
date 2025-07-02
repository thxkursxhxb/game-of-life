import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Setup the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conway's Game of Life",
  description: "A Game of Life simulation built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply the font class to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}