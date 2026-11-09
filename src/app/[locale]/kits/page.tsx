import type { Locale } from "next-intl";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ContactBand } from "@/components/catalog/contact-band";
import { Link } from "@/i18n/navigation";
import { findProduct, kits, kitSummary } from "@/lib/kits";
import { productCategories } from "@/lib/nav";

const categoryHref = (key: string) =>
  productCategories.find((category) => category.key === key)?.href ??
  "/products";

export default async function KitsPage({
  params,
}: PageProps<"/[locale]/kits">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.
  const t = await getTranslations();
  const format = await getFormatter();
  const n = (value: number) => format.number(value);

  return (
    <>
      <div className="container-site py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("pages.kits")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg">{t("kits.lead")}</p>

        <ol className="mt-10 space-y-10">
          {kits.map(({ key, items }, index) => {
            const summary = kitSummary(items);
            const figures = [
              {
                label: t("kits.inverter"),
                value: `${n(summary.inverterKw)} kW`,
              },
              {
                label: t("kits.battery"),
                value: `${n(summary.batteryKwh)} kWh`,
              },
              ...(summary.pvKwp > 0
                ? [{ label: t("kits.solar"), value: `${n(summary.pvKwp)} kWp` }]
                : []),
              {
                label: t("kits.phases"),
                value: t("kits.phaseCount", { count: summary.phases }),
              },
            ];

            return (
              <li
                key={key}
                aria-labelledby={`kit-${key}`}
                className="border border-foreground"
              >
                <div className="grid gap-6 bg-card p-5 md:p-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="font-mono text-sm text-muted-foreground">
                      {t("kits.kitNumber", { number: index + 1 })}
                    </p>
                    <h2
                      id={`kit-${key}`}
                      className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl"
                    >
                      {t(`kits.items.${key}.name`)}
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                      {t(`kits.items.${key}.useCase`)}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 border-t border-l border-foreground">
                      {figures.map(({ label, value }) => (
                        <div
                          key={label}
                          className="border-r border-b border-foreground p-3"
                        >
                          <dt className="text-xs text-muted-foreground">
                            {label}
                          </dt>
                          <dd className="text-xl font-semibold tracking-tight sm:text-2xl">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <Link
                      href="/quote"
                      className="mt-6 inline-flex h-12 items-center bg-brand px-5 font-semibold text-brand-foreground hover:opacity-85"
                    >
                      {t("kits.request")}
                    </Link>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t("catalog.priceOnRequest")}
                    </p>
                  </div>

                  <div className="lg:col-span-7">
                    <h3 className="font-mono text-sm text-muted-foreground">
                      {t("kits.contents")}
                    </h3>
                    <ul className="mt-2 border-b border-foreground">
                      {items.map(({ sku, quantity }) => {
                        const product = findProduct(sku);
                        return (
                          <li
                            key={sku}
                            className="grid grid-cols-[3.5rem_1fr] gap-x-3 border-t border-foreground py-3"
                          >
                            <span className="font-mono">× {quantity}</span>
                            <span>
                              <span className="block font-medium">
                                {product.brand} {product.model}
                              </span>
                              <Link
                                href={categoryHref(product.category)}
                                className="text-sm text-muted-foreground underline underline-offset-4 hover:no-underline"
                              >
                                {t(`catalog.types.${product.type}`)}
                              </Link>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 max-w-2xl text-muted-foreground">
          {t("kits.custom")}
        </p>
      </div>
      <ContactBand />
    </>
  );
}
