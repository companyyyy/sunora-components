import { describe, expect, it } from "vitest";
import messages from "../../messages/en.json";
import { findProduct, kits, kitSummary } from "./kits";

describe("kits", () => {
  it("only uses catalogue products", () => {
    for (const kit of kits) {
      for (const { sku } of kit.items) {
        expect(() => findProduct(sku)).not.toThrow();
      }
    }
  });

  it("has text for every kit", () => {
    for (const { key } of kits) {
      expect(messages.kits.items).toHaveProperty(key);
    }
  });

  it("keeps panel power within the inverter's PV input", () => {
    for (const kit of kits) {
      const { pvKwp, maxPvInputW } = kitSummary(kit.items);
      if (pvKwp > 0) expect(pvKwp * 1000).toBeLessThanOrEqual(maxPvInputW!);
    }
  });

  it("uses batteries that match the inverter voltage", () => {
    for (const kit of kits) {
      const parts = kit.items.map(({ sku }) => findProduct(sku));
      const inverter = parts.find((p) => p.category === "inverters")!;
      for (const battery of parts.filter((p) => p.category === "batteries")) {
        expect(inverter.specs.batteryVoltageV).toBe(48);
        expect(battery.specs.voltageV).toBeGreaterThanOrEqual(48);
        expect(battery.specs.voltageV).toBeLessThanOrEqual(51.2);
      }
    }
  });

  it("has enough mounting for every panel", () => {
    for (const kit of kits) {
      const parts = kit.items.map(({ sku, quantity }) => ({
        product: findProduct(sku),
        quantity,
      }));
      const panels = parts
        .filter(({ product }) => product.category === "panels")
        .reduce((n, { quantity }) => n + quantity, 0);
      const slots = parts
        .filter(({ product }) => product.category === "mounting")
        .reduce(
          (n, { product, quantity }) =>
            n + (product.specs.panelsPerSet ?? 0) * quantity,
          0,
        );
      expect(slots).toBeGreaterThanOrEqual(panels);
    }
  });
});
