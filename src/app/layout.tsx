import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Friend Chat",
  description: "Chat with your AI Friend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
