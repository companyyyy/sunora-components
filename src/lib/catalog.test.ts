import { describe, expect, it } from "vitest";
import messages from "../../messages/en.json";
import { brands, optionSpecs, products } from "./catalog";

describe("catalog", () => {
  it("has unique SKUs", () => {
    const skus = products.map((product) => product.sku);
    expect(new Set(skus).size).toBe(skus.length);
  });

  it("has a translation for every type, spec and option", () => {
    for (const { type, specs } of products) {
      expect(messages.catalog.types).toHaveProperty(type);
      for (const key of Object.keys(specs)) {
        expect(messages.catalog.specs).toHaveProperty(key);
      }
      for (const key of optionSpecs) {
        if (specs[key]) {
          expect(messages.catalog.options).toHaveProperty(String(specs[key]));
        }
      }
    }
  });

  it("lists each brand once", () => {
    const names = brands.map((brand) => brand.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names).toContain("Deye");
  });
});
