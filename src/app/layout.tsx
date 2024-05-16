import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OverlayContextProvider from "./overlay_context_provider";
import BodyWrapper from "./body_wrapper";

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
      <OverlayContextProvider>
        <BodyWrapper inter={inter}>
          {children}
        </BodyWrapper>
      </OverlayContextProvider>
    </html>
  );
}
