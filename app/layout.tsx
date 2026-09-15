import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Muhammad Nadeem Sajjad | Paediatric Surgeon and Paediatric Urologist",
  description: "Paediatric Surgeon and Paediatric Urologist. MBBS, FCPS (Paediatric Surgery). Rasheed Hospital Near DHA Lahore (Mon–Thu 3–5 PM). Zaitoon Hospital Pattoki (Friday 4 PM). Rehman Medical Complex Okara (5:30–7:30 PM). Contact: 0301-7978308.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
