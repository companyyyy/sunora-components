import { useFormatter, useTranslations } from "next-intl";
import type { Messages } from "next-intl";
import {
  optionSpecs,
  type Product,
  type SpecKey,
  specUnits,
} from "@/lib/catalog";

type OptionKey = keyof Messages["catalog"]["options"];

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("catalog");
  const format = useFormatter();

  const specValue = (key: SpecKey, value: Product["specs"][SpecKey]) => {
    if (typeof value === "boolean") return t(value ? "yes" : "no");
    if (optionSpecs.includes(key)) return t(`options.${value as OptionKey}`);
    const text = typeof value === "number" ? format.number(value) : value;
    const unit = value === "HV" ? undefined : specUnits[key];
    if (!unit) return text;
    return unit === "°" ? `${text}°` : `${text} ${unit}`;
  };

  return (
    <li className="grid gap-6 border-t border-foreground py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
      <div>
        <p className="font-mono text-sm text-muted-foreground">
          {product.brand}
        </p>
        <h2 className="mt-1 text-2xl font-medium tracking-tight">
          {product.model}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {t(`types.${product.type}`)}
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm font-medium">
          <span
            aria-hidden="true"
            className={`size-2.5 border border-foreground ${product.inStock ? "bg-brand" : ""}`}
          />
          {t(product.inStock ? "inStock" : "outOfStock")}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("priceOnRequest")}
        </p>
      </div>

      <div>
        <dl className="grid gap-x-8 sm:grid-cols-[repeat(2,minmax(0,1fr))]">
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between gap-4 border-b border-border py-2 text-sm"
            >
              <dt className="shrink-0 text-muted-foreground">
                {t(`specs.${key as SpecKey}`)}
              </dt>
              <dd className="min-w-0 text-right font-mono">
                {specValue(key as SpecKey, value)}
              </dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 border-b border-border py-2 text-sm">
            <dt className="shrink-0 text-muted-foreground">{t("warranty")}</dt>
            <dd className="min-w-0 text-right font-mono">
              {t("warrantyYears", { years: product.warrantyYears })}
            </dd>
          </div>
        </dl>
        <p className="mt-3 font-mono text-xs break-all text-muted-foreground">
          SKU {product.sku}
        </p>
      </div>
    </li>
  );
}
