import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cluso — Background Verification Demo",
  description: "Interactive walkthrough of the Cluso background verification platform. See every step from order creation to hire decision.",
  icons: {
    icon: "/images/cluso-logo.png",
    shortcut: "/images/cluso-logo.png",
    apple: "/images/cluso-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
