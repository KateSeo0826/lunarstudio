import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { routing } from "../../i18n/routing";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920", // 가변 폰트 범위 설정
  variable: "--font-pretendard", // CSS 변수명
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans", // CSS 변수명
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${pretendard.variable} ${dmSans.variable}`}>
      <body className={pretendard.className}>
        <NextIntlClientProvider locale={locale}>
          <Navar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
