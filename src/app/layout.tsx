import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resistor Practice",
  description: "Practice reading resistor codes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Resistor Practice</title>
        <meta
          name="google-site-verification"
          content="y-Rx7OQIIqGj5ebGsRWAhhgQTOFisE_WKbcQpE5s7SA"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
