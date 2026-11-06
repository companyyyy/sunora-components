import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { DesktopNav } from "./desktop-nav";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="hidden bg-inverse font-mono text-xs text-inverse-foreground md:block">
        <div className="container-site flex h-8 items-center justify-end gap-5">
          <a href={site.phoneHref} className="hover:underline">
            <span className="sr-only">{t("phone")}: </span>
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="hover:underline">
            <span className="sr-only">{t("email")}: </span>
            {site.email}
          </a>
        </div>
      </div>

      <div className="container-site flex h-16 items-center gap-2">
        <Logo />

        <div className="ml-4 hidden xl:block">
          <DesktopNav />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-1 xl:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/quote"
              className="px-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t("requestQuote")}
            </Link>
            <Link
              href="/account"
              className="px-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t("logIn")}
            </Link>
          </div>

          <Button
            variant="brand"
            size="lg"
            className="px-3 font-semibold"
            nativeButton={false}
            render={<Link href="/partner" />}
          >
            {t("becomePartner")}
          </Button>

          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
