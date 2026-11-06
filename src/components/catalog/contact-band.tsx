import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

/** Closing call to action for catalogue pages. Prices are given on request. */
export function ContactBand() {
  const t = useTranslations();

  return (
    <section className="bg-brand text-brand-foreground">
      <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-2xl font-medium tracking-tight">
          {t("catalog.cta")}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={site.phoneHref}
            className="inline-flex h-12 items-center bg-brand-foreground px-5 font-mono text-brand hover:opacity-85"
          >
            {site.phone}
          </a>
          <Link
            href="/quote"
            className="font-medium underline underline-offset-4 hover:no-underline"
          >
            {t("common.requestQuote")}
          </Link>
        </div>
      </div>
    </section>
  );
}
