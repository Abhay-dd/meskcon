import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MESKCON 2027 — International Conference | MES Kalladi College",
    template: "%s | MESKCON 2027",
  },
  description:
    "MESKCON 2027: 'Bridging Knowledge for a Smarter, Sustainable and Inclusive World' — International Conference at MES Kalladi College, Mannarkkad, Kerala. January 29-30, 2027. Hybrid format.",
  keywords: [
    "MESKCON",
    "MESKCON 2027",
    "international conference",
    "MES Kalladi College",
    "Mannarkkad",
    "Kerala",
    "academic conference",
    "interdisciplinary research",
    "sustainable world",
    "IQAC",
  ],
  authors: [{ name: "MES Kalladi College, Mannarkkad" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.meskcon.in",
    title: "MESKCON 2027 — International Conference",
    description:
      "Bridging Knowledge for a Smarter, Sustainable and Inclusive World — January 29-30, 2027",
    siteName: "MESKCON",
  },
  twitter: {
    card: "summary_large_image",
    title: "MESKCON 2027 — International Conference",
    description:
      "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakartaSans.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-[#050609] text-[#f8f9fc] min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#14192b",
              color: "#f8f9fc",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "12px",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "#d4af37",
                secondary: "#050609",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
