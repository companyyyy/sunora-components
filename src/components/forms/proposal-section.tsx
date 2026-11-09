import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { ProposalForm } from "./proposal-form";

/** Request-a-proposal block: pitch and direct contacts beside the form. */
export function ProposalSection({
  headingLevel = 2,
}: {
  headingLevel?: 1 | 2;
}) {
  const t = useTranslations();
  const Heading = `h${headingLevel}` as const;
  const { street, postalCode, city, country } = site.address;

  return (
    <section
      aria-labelledby="proposal-heading"
      className="container-site py-12 md:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading
            id="proposal-heading"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {t("form.heading")}
          </Heading>
          <p className="mt-4 max-w-md text-lg">{t("form.lead")}</p>
          <address className="mt-8 space-y-1 font-mono text-sm not-italic">
            <a href={site.phoneHref} className="block hover:underline">
              <span className="sr-only">{t("common.phone")}: </span>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block hover:underline">
              <span className="sr-only">{t("common.email")}: </span>
              {site.email}
            </a>
            <p className="pt-3 text-muted-foreground">
              {site.legalName}
              <br />
              {street}, {postalCode} {city}, {country}
            </p>
          </address>
        </div>
        <div className="lg:col-span-7">
          <ProposalForm />
        </div>
      </div>
    </section>
  );
}
