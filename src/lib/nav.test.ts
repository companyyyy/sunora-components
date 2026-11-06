import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import messages from "../../messages/en.json";
import {
  categorySlugs,
  footerGroups,
  legalLinks,
  primaryLinks,
  productCategories,
  solutionLinks,
} from "./nav";

const pageExists = (href: string) => {
  const path = href.split("#")[0];
  const routePath = categorySlugs.some((slug) => path === `/products/${slug}`)
    ? "/products/[category]"
    : path;
  return existsSync(join("src/app/[locale]", routePath, "page.tsx"));
};

const footerLinks = footerGroups.flatMap((group) => [...group.links]);

describe("navigation", () => {
  it("only links to pages that exist", () => {
    const hrefs = [
      ...productCategories,
      ...solutionLinks,
      ...primaryLinks,
      ...footerLinks,
      ...legalLinks,
    ].map((link) => link.href);

    expect(hrefs.filter((href) => !pageExists(href))).toEqual([]);
  });

  it("has a translation for every label", () => {
    for (const { key } of [...primaryLinks, ...footerLinks]) {
      expect(messages.nav).toHaveProperty(key);
    }
    for (const { key } of productCategories) {
      expect(messages.categories).toHaveProperty(key);
    }
    for (const { key } of solutionLinks) {
      expect(messages.solutions).toHaveProperty(key);
    }
    for (const { key } of legalLinks) {
      expect(messages.pages).toHaveProperty(key);
    }
    for (const { key } of footerGroups) {
      expect(messages.footer).toHaveProperty(key);
    }
  });
});
