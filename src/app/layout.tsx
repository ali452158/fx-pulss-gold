import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FX_Pulss Gold | كورسات SMC و ICT و Book Map الاحترافية",
  description: "منصة FX_Pulss Gold — كورسات تداول احترافية لعلم السيولة (SMC & ICT) ومنصة Book Map، أسعار حية للذهب والفوركس، دفع بالعملات الرقمية، وشهادات معتمدة باسمك.",
  keywords: ["FX_Pulss Gold", "فوركس", "التداول", "SMC", "ICT", "Book Map", "السيولة", "الذهب", "كورسات تداول", "عملات رقمية", "شهادات"],
  authors: [{ name: "FX_Pulss Gold" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "FX_Pulss Gold | كورسات التداول الاحترافية",
    description: "كورسات SMC & ICT و Book Map — علم السيولة والخريطة الحرارية",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="dark">
      <body
        className={`${cairo.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
