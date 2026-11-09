import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/catalog/contact-band";
import { AboutSection } from "@/components/distribution/about-section";
import { CoreBrands } from "@/components/distribution/core-brands";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.

  return (
    <>
      <AboutSection full />
      <div className="border-t border-foreground">
        <CoreBrands />
      </div>
      <ContactBand />
    </>
  );
}
