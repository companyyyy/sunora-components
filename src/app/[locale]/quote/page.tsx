import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ProposalSection } from "@/components/forms/proposal-section";

export default async function QuotePage({
  params,
}: PageProps<"/[locale]/quote">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale); // Validated by the locale layout.

  return <ProposalSection headingLevel={1} />;
}
