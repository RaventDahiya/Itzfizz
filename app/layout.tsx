import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Itzfizz — Move ideas forward",
  description: "A scroll-driven creative studio hero experience."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
