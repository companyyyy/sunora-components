import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
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

  return (
    <div className="container-site py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {t(`categories.${category.key}.name`)}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {t("placeholder.todo", { milestone: 2 })}
      </p>
    </div>
  );
}
