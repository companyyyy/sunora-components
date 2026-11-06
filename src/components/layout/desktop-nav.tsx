"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";
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
import { primaryLinks, productCategories, solutionLinks } from "@/lib/nav";

function MenuEntry({
  href,
  icon: Icon,
  name,
  description,
}: {
  href: string;
  icon: LucideIcon;
  name: string;
  description: string;
}) {
  return (
    <NavigationMenuLink
      closeOnClick
      render={<Link href={href} />}
      className="items-start gap-3 p-3"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-medium">{name}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
          {description}
        </span>
      </span>
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
          <NavigationMenuContent className="w-3xl p-3">
            <div className="grid grid-cols-[1fr_1fr_11rem] gap-1">
              <ul className="col-span-2 grid grid-cols-2 gap-1">
                {productCategories.map(({ key, href, icon }) => (
                  <li key={key}>
                    <MenuEntry
                      href={href}
                      icon={icon}
                      name={t(`categories.${key}.name`)}
                      description={t(`categories.${key}.description`)}
                    />
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-1 border-l border-border pl-3">
                {(
                  [
                    ["allProducts", "/products"],
                    ["allBrands", "/brands"],
                    ["browseKits", "/kits"],
                  ] as const
                ).map(([key, href]) => (
                  <li key={key}>
                    <NavigationMenuLink
                      closeOnClick
                      render={<Link href={href} />}
                      className="justify-between font-medium"
                    >
                      {t(`nav.${key}`)}
                      <ArrowRight aria-hidden="true" />
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("nav.solutions")}</NavigationMenuTrigger>
          <NavigationMenuContent className="w-sm p-3">
            <ul className="flex flex-col gap-1">
              {solutionLinks.map(({ key, href, icon }) => (
                <li key={key}>
                  <MenuEntry
                    href={href}
                    icon={icon}
                    name={t(`solutions.${key}.name`)}
                    description={t(`solutions.${key}.description`)}
                  />
                </li>
              ))}
            </ul>
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
