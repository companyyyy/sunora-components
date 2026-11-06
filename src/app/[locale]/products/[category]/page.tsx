import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/catalog/contact-band";
import { ProductCard } from "@/components/catalog/product-card";
import { PlaceholderNote } from "@/components/layout/page-placeholder";
import { routing } from "@/i18n/routing";
import { productsIn } from "@/lib/catalog";
import { productCategories } from "@/lib/nav";

const findCategory = (slug: string) =>
  productCategories.find(({ href }) => href === `/products/${slug}`);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    productCategories.map(({ href }) => ({
      locale,
      category: href.replace("/products/", ""),
    })),
  );
}

export default async function CategoryPage({
  params,
}: PageProps<"/[locale]/products/[category]">) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.
  const category = findCategory(slug);
  if (!category) notFound();

  const t = await getTranslations();
  const items = productsIn(category.key);

  return (
    <>
      <div className="container-site py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t(`categories.${category.key}.name`)}
        </h1>
        {items.length > 0 ? (
          <>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              {t("catalog.productCount", { count: items.length })}
            </p>
            <ul className="mt-8 border-b border-foreground">
              {items.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </ul>
          </>
        ) : (
          <PlaceholderNote milestone={2} />
        )}
      </div>
      {items.length > 0 && <ContactBand />}
    </>
  );
}
