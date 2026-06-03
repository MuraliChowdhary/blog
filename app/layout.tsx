import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muralichowdhary.com"),
  title: {
    default: "Murali — Engineering Blog",
    template: "%s | Murali",
  },
  description:
    "Writing about backend systems, distributed infrastructure, and AI engineering.",
  keywords: [
    "backend engineering",
    "system design",
    "Java",
    "AWS",
    "distributed systems",
    "AI",
    "RAG",
    "engineering blog",
  ],
  authors: [{ name: "Murali" }],
  creator: "Murali Sudireddy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muralichowdhary.com",
    siteName: "Murali",
    title: "Murali — Engineering Blog",
    description:
      "Writing about backend systems, distributed infrastructure, and AI engineering.",
  },
  twitter: {
    card: "summary",
    title: "Murali — Engineering Blog",
    description:
      "Writing about backend systems, distributed infrastructure, and AI engineering.",
    creator: "@muralichowdhary",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// import { Instrument_Serif, JetBrains_Mono } from "next/font/google";

// const instrumentSerif = Instrument_Serif({
//   weight: ["400"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   variable: "--font-serif",
//   display: "swap",
// });

// const jetbrainsMono = JetBrains_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
//   display: "swap",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}