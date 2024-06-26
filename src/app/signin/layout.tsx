import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NextAuthProvider } from "../next_auth_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram UI Clone",
  description: "Generated by Jiehao Luo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${inter.className}`}>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
