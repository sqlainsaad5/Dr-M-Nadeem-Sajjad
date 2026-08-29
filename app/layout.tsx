import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. M. Nadeem Sajjad | Paediatric Surgeon & Urologist",
  description: "Paediatric surgery and paediatric urology care by Dr. M. Nadeem Sajjad in Lahore.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
