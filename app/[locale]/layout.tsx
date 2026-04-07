import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { routing } from "../../i18n/routing";
import Script from "next/script";
import "./globals.css";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: "https://lunar-studio.ca/",
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `https://lunar-studio.ca/${locale}`,
      siteName: "Lunar Studio",
      images: [
        {
          url: "images/og-image.png",
          width: 1200,
          height: 600,
          alt: "Lunar Studio Official Website",
        },
      ],
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["images/og-image.png"],
    },
  };
}

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
      <head>
        <meta
          name="google-site-verification"
          content="Yzr9M-zbO617FBym5Y-F0u8tm_X7BKs-YerMiIhzig0"
        />
        <meta
          name="naver-site-verification"
          content="ad3ed6914ed37996162b48bc31cdbbb203aa4747"
        />
        <link rel="alternate" href="https://lunar-studio.ca/ko" hrefLang="ko" />
        <link rel="alternate" href="https://lunar-studio.ca/en" hrefLang="en" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3DEF40JVN1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3DEF40JVN1');
          `}
        </Script>
      </head>
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
