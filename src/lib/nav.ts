type MenuItem = { key: string; href: string };

export const productCategories = [
  { key: "panels", href: "/products/solar-panels" },
  { key: "inverters", href: "/products/inverters" },
  { key: "batteries", href: "/products/batteries" },
  { key: "mounting", href: "/products/mounting" },
  { key: "accessories", href: "/products/accessories" },
  { key: "evChargers", href: "/products/ev-chargers" },
] as const satisfies readonly MenuItem[];

export const categorySlugs = productCategories.map((category) =>
  category.href.replace("/products/", ""),
);

export const solutionLinks = [
  { key: "residential", href: "/solutions#residential" },
  { key: "commercial", href: "/solutions#commercial" },
  { key: "bess", href: "/solutions#bess" },
] as const satisfies readonly MenuItem[];

/** Plain header links, in display order. Keys live in the `nav` messages. */
export const primaryLinks = [
  { key: "brands", href: "/brands" },
  { key: "delivery", href: "/delivery" },
  { key: "kits", href: "/kits" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const footerGroups = [
  {
    key: "company",
    links: [
      { key: "about", href: "/about" },
      { key: "brands", href: "/brands" },
      { key: "delivery", href: "/delivery" },
      { key: "partner", href: "/partner" },
    ],
  },
  {
    key: "help",
    links: [
      { key: "quote", href: "/quote" },
      { key: "contact", href: "/contact" },
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
