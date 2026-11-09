import { useTranslations } from "next-intl";
import { destinations, hub } from "@/lib/distribution";
import { EuropeMap } from "./europe-map";

/** Delivery routes: the map plus the same cities as a readable list. */
export function DeliverySection({
  headingLevel = 2,
}: {
  headingLevel?: 1 | 2;
}) {
  const t = useTranslations("distribution");
  const Heading = `h${headingLevel}` as const;

  return (
    <section
      aria-labelledby="delivery-heading"
      className="container-site py-12 md:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <Heading
            id="delivery-heading"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {t("heading")}
          </Heading>
          <p className="mt-4 max-w-md text-lg">{t("lead")}</p>

          <p className="mt-8 font-mono text-sm text-muted-foreground">
            {t("from", { city: t(`cities.${hub.key}`) })}
          </p>
          <ol className="mt-2 border-b border-foreground">
            {destinations.map(({ key }, index) => (
              <li
                key={key}
                className="grid grid-cols-[3rem_1fr_auto] items-baseline border-t border-foreground py-3"
              >
                <span aria-hidden="true" className="font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-medium tracking-tight">
                  {t(`cities.${key}`)}
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  {t(`countries.${key}`)}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">{t("other")}</p>
        </div>

        <figure className="border border-foreground lg:col-span-7">
          <EuropeMap labelledBy="delivery-map-caption" />
          <figcaption
            id="delivery-map-caption"
            className="border-t border-foreground px-4 py-3 font-mono text-xs"
          >
            {t("mapCaption")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
