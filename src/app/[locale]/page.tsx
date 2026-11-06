import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CatalogueIndex } from "@/components/catalog/catalogue-index";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.
  const t = await getTranslations();

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <div className="container-site py-16 md:py-24">
          <h1
            lang="et"
            className="max-w-5xl text-[11.5vw] leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-8xl"
          >
            {site.slogan}
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl">{t("home.lead")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/quote"
              className="inline-flex h-12 items-center bg-brand-foreground px-5 font-medium text-brand hover:opacity-85"
            >
              {t("common.requestQuote")}
            </Link>
            <Link
              href="/products"
              className="font-medium underline underline-offset-4 hover:no-underline"
            >
              {t("nav.allProducts")}
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="catalogue"
        className="container-site py-12 md:py-16"
      >
        <h2 id="catalogue" className="font-mono text-sm text-muted-foreground">
          {t("home.catalogue")}
        </h2>
        <div className="mt-4">
          <CatalogueIndex />
        </div>
      </section>
    </>
  );
}
