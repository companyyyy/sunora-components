import Image from "next/image";
import { useTranslations } from "next-intl";
import { coreBrands } from "@/lib/distribution";

/** Manufacturer partners, shown with their logos on white in both themes. */
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
        {coreBrands.map(({ name, logo, categories }) => (
          <li
            key={name}
            className="flex flex-col border-r border-b border-foreground"
          >
            <div className="flex h-28 items-center justify-center bg-white px-6 sm:h-36">
              {logo ? (
                <Image
                  src={logo}
                  alt={name}
                  className="max-h-16 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="text-3xl font-semibold tracking-tight text-[#151713]">
                  {name}
                </span>
              )}
            </div>
            <span className="border-t border-foreground px-5 py-3 font-mono text-xs text-muted-foreground">
              {categories.map((key) => t(`categories.${key}.name`)).join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
