import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

const points = ["wholesale", "brands", "delivery"] as const;

/**
 * Who we are. The home page shows the short version with a link to /about,
 * which adds the full story and the company details.
 */
export function AboutSection({ full = false }: { full?: boolean }) {
  const t = useTranslations();
  const Heading = full ? "h1" : "h2";
  const { street, postalCode, city, country } = site.address;

  return (
    <section
      aria-labelledby="about-heading"
      className="container-site py-12 md:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading
            id="about-heading"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {t("about.heading")}
          </Heading>
          <p className="mt-4 text-xl md:text-2xl">{t("about.lead")}</p>
          {full ? (
            <div className="mt-6 space-y-4 text-lg">
              <p>{t("about.story1")}</p>
              <p>{t("about.story2")}</p>
              <p>{t("about.story3")}</p>
            </div>
          ) : (
            <Link
              href="/about"
              className="mt-6 inline-block font-medium underline underline-offset-4 hover:no-underline"
            >
              {t("about.more")}
            </Link>
          )}
        </div>

        <div className="lg:col-span-7">
          <ol className="border-b border-foreground">
            {points.map((key, index) => (
              <li
                key={key}
                className="grid grid-cols-[3rem_1fr] gap-y-1 border-t border-foreground py-5 md:grid-cols-[4rem_1fr]"
              >
                <span aria-hidden="true" className="font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {t(`about.points.${key}.title`)}
                </h3>
                <p className="col-start-2 text-muted-foreground">
                  {t(`about.points.${key}.text`)}
                </p>
              </li>
            ))}
          </ol>

          {full && (
            <dl className="mt-8 grid gap-x-8 gap-y-3 font-mono text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">
                  {t("about.details.company")}
                </dt>
                <dd>{site.legalName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">
                  {t("about.details.address")}
                </dt>
                <dd>
                  {street}, {postalCode} {city}, {country}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("footer.vatId")}</dt>
                <dd>{site.vatId}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">
                  {t("about.details.contact")}
                </dt>
                <dd>
                  <a href={site.phoneHref} className="block hover:underline">
                    {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="block hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
