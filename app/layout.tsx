import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SITE_URL } from "@/lib/constants";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pernikahan Ridwan & Rani",
  description:
    "Dengan penuh kebahagiaan, kami mengundang Anda untuk menyaksikan dan memberikan doa restu atas pernikahan Ridwan & Rani pada Rabu, 23 September 2026 di Bogor.",
  keywords: [
    "pernikahan",
    "wedding",
    "Ridwan",
    "Rani Rahmawati",
    "undangan digital",
    "Bogor",
    "2026",
    "#RidwanRani2026",
  ],
  authors: [{ name: "Ridwan & Rani" }],
  creator: "Ridwan & Rani",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon.png",
  },
  robots: {
    index: true,
    follow: false,
    googleBot: {
      index: true,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Pernikahan Ridwan & Rani — 23 September 2026",
    description:
      "Kami mengundang Anda untuk menyaksikan dan memberikan doa restu atas pernikahan kami. Rabu, 23 September 2026, Bogor.",
    siteName: "Undangan Pernikahan Ridwan & Rani",
    locale: "id_ID",
    images: [
      {
        url: `${SITE_URL}/images/foto-2.jpg`,
        width: 1280,
        height: 960,
        alt: "Pernikahan Ridwan & Rani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pernikahan Ridwan & Rani — 23 September 2026",
    description:
      "Kami mengundang Anda untuk menyaksikan momen bahagia kami. Rabu, 23 September 2026, Bogor.",
    images: [`${SITE_URL}/images/foto-2.jpg`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8E7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0A08" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
