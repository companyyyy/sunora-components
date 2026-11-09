import { useTranslations } from "next-intl";
import { coreBrands } from "@/lib/distribution";

/** The five brands we distribute in volume, as plain wordmarks. */
export function CoreBrands() {
  const t = useTranslations();

  return (
    <section
      aria-labelledby="core-brands"
      className="container-site py-12 md:py-16"
    >
      <h2
        id="core-brands"
        className="text-3xl font-semibold tracking-tight md:text-4xl"
      >
        {t("distribution.brandsHeading")}
      </h2>
      <p className="mt-4 max-w-xl text-lg">{t("distribution.brandsLead")}</p>
      <ul className="mt-8 grid grid-cols-1 border-t border-l border-foreground sm:grid-cols-2 lg:grid-cols-5">
        {coreBrands.map(({ name, categories }) => (
          <li
            key={name}
            className="flex min-h-36 flex-col justify-between gap-6 border-r border-b border-foreground p-5"
          >
            <span className="text-3xl font-semibold tracking-tight">
              {name}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {categories.map((key) => t(`categories.${key}.name`)).join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
