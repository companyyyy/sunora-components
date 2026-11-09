"use client";

import { useTranslations } from "next-intl";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryLinks, productCategories } from "@/lib/nav";

function MenuEntry({ href, name }: { href: string; name: string }) {
  return (
    <NavigationMenuLink closeOnClick render={<Link href={href} />}>
      {name}
    </NavigationMenuLink>
  );
}

export function DesktopNav() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <NavigationMenu aria-label={t("common.mainNavigation")}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("nav.products")}</NavigationMenuTrigger>
          <NavigationMenuContent className="w-xl p-3">
            <div className="grid grid-cols-[1fr_11rem] gap-3">
              <ul className="flex flex-col">
                {productCategories.map(({ key, href }) => (
                  <li key={key}>
                    <MenuEntry href={href} name={t(`categories.${key}.name`)} />
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col border-l border-border pl-3">
                {(
                  [
                    ["allProducts", "/products"],
                    ["allBrands", "/brands"],
                    ["browseKits", "/kits"],
                  ] as const
                ).map(([key, href]) => (
                  <li key={key}>
                    <MenuEntry href={href} name={t(`nav.${key}`)} />
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {primaryLinks.map(({ key, href }) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuLink
              render={<Link href={href} />}
              active={pathname.startsWith(href)}
              className={navigationMenuTriggerStyle()}
            >
              {t(`nav.${key}`)}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
