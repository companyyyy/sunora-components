"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { primaryLinks, productCategories } from "@/lib/nav";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkClass =
    "flex min-h-11 items-center gap-3 rounded-md px-2 hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 outline-none";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={t("common.openMenu")}
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        className="w-[min(22rem,90vw)] gap-0 overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-border p-3 pl-4">
          <SheetTitle>{t("common.menu")}</SheetTitle>
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={t("common.closeMenu")}
              />
            }
          >
            <X className="size-5" />
          </SheetClose>
        </div>

        <nav aria-label={t("common.mainNavigation")} className="p-2">
          <Link
            href="/products"
            onClick={close}
            className={`${linkClass} font-semibold`}
          >
            {t("nav.products")}
          </Link>
          <ul>
            {productCategories.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} onClick={close} className={linkClass}>
                  {t(`categories.${key}.name`)}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-2 border-t border-border pt-2 font-semibold">
            {primaryLinks.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} onClick={close} className={linkClass}>
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" onClick={close} className={linkClass}>
                {t("nav.quote")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-border p-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
