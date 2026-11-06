import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale, Messages } from "next-intl";
import { site } from "@/lib/site";

type PageKey = keyof Messages["pages"];

/** Note for unfinished pages. `milestone` records which one replaces it. */
export function PlaceholderNote({ milestone }: { milestone: number }) {
  const t = useTranslations("placeholder");

  return (
    <div data-milestone={milestone} className="mt-4 max-w-xl">
      <p className="text-muted-foreground">{t("notReady")}</p>
      <p className="mt-4 font-mono text-sm">
        <a href={site.phoneHref} className="block hover:underline">
          {site.phone}
        </a>
        <a href={`mailto:${site.email}`} className="block hover:underline">
          {site.email}
        </a>
      </p>
    </div>
  );
}

/** Temporary page body. Each route replaces it in the milestone it names. */
export function placeholderPage(pageKey: PageKey, milestone: number) {
  return async function PlaceholderPage({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    setRequestLocale(locale as Locale); // Validated by the locale layout.
    const pages = await getTranslations("pages");

    return (
      <div className="container-site py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {pages(pageKey)}
        </h1>
        <PlaceholderNote milestone={milestone} />
      </div>
    );
  };
}
