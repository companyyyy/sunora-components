import {
  BatteryCharging,
  Cable,
  Fence,
  Factory,
  Home,
  PlugZap,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

type MenuItem = { key: string; href: string; icon: LucideIcon };

export const productCategories = [
  { key: "panels", href: "/products/solar-panels", icon: Sun },
  { key: "inverters", href: "/products/inverters", icon: Zap },
  { key: "batteries", href: "/products/batteries", icon: BatteryCharging },
  { key: "mounting", href: "/products/mounting", icon: Fence },
  { key: "accessories", href: "/products/accessories", icon: Cable },
  { key: "evChargers", href: "/products/ev-chargers", icon: PlugZap },
] as const satisfies readonly MenuItem[];

export const categorySlugs = productCategories.map((category) =>
  category.href.replace("/products/", ""),
);

export const solutionLinks = [
  { key: "residential", href: "/solutions#residential", icon: Home },
  { key: "commercial", href: "/solutions#commercial", icon: Factory },
  { key: "bess", href: "/solutions#bess", icon: BatteryCharging },
] as const satisfies readonly MenuItem[];

/** Plain header links, in display order. Keys live in the `nav` messages. */
export const primaryLinks = [
  { key: "brands", href: "/brands" },
  { key: "kits", href: "/kits" },
  { key: "knowledge", href: "/knowledge" },
  { key: "about", href: "/about" },
  { key: "support", href: "/support" },
  { key: "contact", href: "/contact" },
] as const;

export const footerGroups = [
  {
    key: "company",
    links: [
      { key: "about", href: "/about" },
      { key: "brands", href: "/brands" },
      { key: "knowledge", href: "/knowledge" },
      { key: "delivery", href: "/delivery" },
      { key: "partner", href: "/partner" },
    ],
  },
  {
    key: "help",
    links: [
      { key: "support", href: "/support" },
      { key: "quote", href: "/quote" },
      { key: "contact", href: "/contact" },
      { key: "account", href: "/account" },
    ],
  },
] as const;

/** Legal links use the `pages` messages, since `nav` has no entry for them. */
export const legalLinks = [
  { key: "terms", href: "/legal/terms" },
  { key: "privacy", href: "/legal/privacy" },
  { key: "cookies", href: "/legal/cookies" },
  { key: "imprint", href: "/legal/imprint" },
] as const;
