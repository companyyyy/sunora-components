import type { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { fontClasses } from "@/lib/fonts";
import { site } from "@/lib/site";
import messages from "../../messages/en.json";
import "./globals.css";

const t = messages.notFound;

export const metadata: Metadata = {
  title: `${t.title} | ${site.name}`,
  description: t.description,
};

// Becomes 404.html, which GitHub Pages serves for unknown paths.
export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale} className={fontClasses}>
      <body className="flex min-h-dvh flex-col antialiased">
        <main className="container-site flex-1 py-24 text-center">
          <p className="text-sm font-semibold text-muted-foreground tabular-nums">
            404
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {t.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{t.description}</p>
          <Link
            className="mt-6 inline-block font-medium underline underline-offset-4"
            href={`/${routing.defaultLocale}`}
          >
            {t.backHome}
          </Link>
        </main>
      </body>
    </html>
  );
}
