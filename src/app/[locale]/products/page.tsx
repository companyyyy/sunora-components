import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CatalogueIndex } from "@/components/catalog/catalogue-index";
import { ContactBand } from "@/components/catalog/contact-band";

export default async function ProductsPage({
  params,
}: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.
  const t = await getTranslations("pages");

  return (
    <>
      <div className="container-site py-12 md:py-16">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl">
          {t("products")}
        </h1>
        <CatalogueIndex />
      </div>
      <ContactBand />
    </>
  );
}
