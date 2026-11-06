import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { productsIn } from "@/lib/catalog";
import { productCategories } from "@/lib/nav";

/** Numbered list of product categories, used on the home and products pages. */
export function CatalogueIndex() {
  const t = useTranslations();

  return (
    <ol className="border-b border-foreground">
      {productCategories.map(({ key, href }, index) => {
        const count = productsIn(key).length;

        return (
          <li key={key} className="border-t border-foreground">
            <Link
              href={href}
              className="grid grid-cols-[3rem_1fr] items-baseline py-4 hover:bg-brand hover:text-brand-foreground md:grid-cols-[6rem_1fr_auto] md:py-5"
            >
              <span aria-hidden="true" className="font-mono text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-medium tracking-tight md:text-4xl">
                {t(`categories.${key}.name`)}
              </span>
              {count > 0 && (
                <span className="col-start-2 mt-1 font-mono text-sm md:col-start-3 md:mt-0">
                  {t("catalog.productCount", { count })}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
