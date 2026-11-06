import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
    namespace: "metadata",
  });

  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.name}` },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <a
              href="#main"
              className="sr-only z-50 rounded-md bg-background px-3 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
            >
              {t("skipToContent")}
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
