import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "CloudRate — Public cloud pricing comparison",
  description: "Compare public list prices across AWS, Azure, Google Cloud, and Oracle Cloud."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
