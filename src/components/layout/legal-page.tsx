import type { Locale } from "next-intl";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

type Section = { heading: string; paragraphs?: string[]; list?: string[] };

/** When the policy texts last changed. Update with every edit to them. */
const updated = new Date("2026-11-09");

/** A policy page whose text lives in the `legal.<key>` messages. */
export function legalPage(key: "privacy" | "cookies") {
  return async function LegalPage({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    setRequestLocale(locale as Locale); // Validated by the locale layout.
    const t = await getTranslations();
    const format = await getFormatter();
    const sections = t.raw(`legal.${key}.sections`) as Section[];

    return (
      <article className="container-site max-w-3xl py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t(`pages.${key}`)}
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {t("legal.updated", {
            date: format.dateTime(updated, { dateStyle: "long" }),
          })}
        </p>
        <p className="mt-6 text-lg">{t(`legal.${key}.intro`)}</p>

        {sections.map(({ heading, paragraphs = [], list = [] }) => (
          <section key={heading} className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">{heading}</h2>
            {paragraphs.map((text) => (
              <p key={text} className="mt-3">
                {text}
              </p>
            ))}
            {list.length > 0 && (
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {list.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    );
  };
}
