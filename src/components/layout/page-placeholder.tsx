import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale, Messages } from "next-intl";

type PageKey = keyof Messages["pages"];

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
    const placeholder = await getTranslations("placeholder");

    return (
      <div className="container-site py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {pages(pageKey)}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {placeholder("todo", { milestone })}
        </p>
      </div>
    );
  };
}
