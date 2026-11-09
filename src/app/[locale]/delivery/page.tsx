import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/catalog/contact-band";
import { DeliverySection } from "@/components/distribution/delivery-section";
import { PhotoBanner } from "@/components/layout/photo-banner";
import winterFarm from "@/assets/photos/solar-farm-winter.jpg";

export default async function DeliveryPage({
  params,
}: PageProps<"/[locale]/delivery">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.

  return (
    <>
      <PhotoBanner src={winterFarm} priority />
      <DeliverySection headingLevel={1} />
      <ContactBand />
    </>
  );
}
