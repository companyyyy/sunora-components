"use client";

import { type Locale, useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Renders nothing until a second language is added to the routing config. */
export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  if (routing.locales.length < 2) return null;

  return (
    <select
      aria-label={t("language")}
      value={locale}
      onChange={(event) =>
        router.replace(pathname, { locale: event.target.value as Locale })
      }
      className="h-9 rounded-lg border border-input bg-background px-2 text-sm uppercase outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {routing.locales.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  );
}
