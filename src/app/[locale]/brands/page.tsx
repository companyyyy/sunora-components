import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/catalog/contact-band";
import { CoreBrands } from "@/components/distribution/core-brands";
import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/catalog";
import { productCategories } from "@/lib/nav";

const categoryHref = (key: string) =>
  productCategories.find((category) => category.key === key)?.href ??
  "/products";

export default async function BrandsPage({
  params,
}: PageProps<"/[locale]/brands">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.
  const t = await getTranslations();

  return (
    <>
      <h1 className="sr-only">{t("pages.brands")}</h1>
      <CoreBrands />
      <div className="container-site pb-12 md:pb-16">
        <h2 className="mb-8 font-mono text-sm text-muted-foreground">
          {t("brands.inCatalogue")}
        </h2>
        <ul className="border-b border-foreground">
          {brands.map(({ name, categories }) => (
            <li
              key={name}
              className="flex flex-col gap-1 border-t border-foreground py-4 md:flex-row md:items-baseline md:justify-between"
            >
              <span className="text-2xl font-medium tracking-tight md:text-3xl">
                {name}
              </span>
              <span className="flex flex-wrap gap-x-4 text-sm">
                {categories.map((key) => (
                  <Link
                    key={key}
                    href={categoryHref(key)}
                    className="underline underline-offset-4 hover:no-underline"
                  >
                    {t(`categories.${key}.name`)}
                  </Link>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ContactBand />
    </>
  );
}
