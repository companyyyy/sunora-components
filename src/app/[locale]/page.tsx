import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CatalogueIndex } from "@/components/catalog/catalogue-index";
import { CoreBrands } from "@/components/distribution/core-brands";
import { DeliverySection } from "@/components/distribution/delivery-section";
import { ProposalSection } from "@/components/forms/proposal-section";
import { Link } from "@/i18n/navigation";
import { coreBrands, destinations } from "@/lib/distribution";
import { site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.
  const t = await getTranslations();

  const facts = [
    { value: String(coreBrands.length), label: t("home.facts.brands") },
    { value: String(destinations.length), label: t("home.facts.cities") },
    { value: "B2B", label: t("home.facts.volume") },
  ];

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <div className="container-site py-16 md:py-24">
          <p className="font-mono text-sm">{t("home.eyebrow")}</p>
          <h1
            lang="et"
            className="mt-4 max-w-5xl text-[11.5vw] leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-8xl"
          >
            {site.slogan}
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl">{t("home.lead")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/quote"
              className="inline-flex h-12 items-center bg-brand-foreground px-5 font-medium text-brand hover:opacity-85"
            >
              {t("home.requestProposal")}
            </Link>
            <Link
              href="/delivery"
              className="font-medium underline underline-offset-4 hover:no-underline"
            >
              {t("nav.delivery")}
            </Link>
          </div>
          <dl className="mt-12 grid max-w-3xl grid-cols-1 border-t border-brand-foreground sm:grid-cols-3">
            {facts.map(({ value, label }) => (
              <div
                key={label}
                className="flex items-baseline gap-3 border-b border-brand-foreground py-3 sm:flex-col sm:gap-1 sm:border-b-0"
              >
                <dt className="sr-only">{label}</dt>
                <dd className="text-4xl font-semibold tracking-tight">
                  {value}
                </dd>
                <dd className="text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CoreBrands />

      <div className="border-y border-foreground bg-secondary">
        <DeliverySection />
      </div>

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

      <div className="border-t border-foreground">
        <ProposalSection />
      </div>
    </>
  );
}
