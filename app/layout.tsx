import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, League_Gothic } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const leagueGothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhode Island Strength and Conditioning",
  description:
    "The only gym that keeps you accountable. Custom training plans, 1:4 personal training, and trainers who text and call before every session.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${leagueGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink font-sans text-white">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
