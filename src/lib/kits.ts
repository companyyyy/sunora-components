import { products, type Product } from "./catalog";

type KitItem = { sku: string; quantity: number };

type Kit = {
  /** Key in the `kits.items` messages. */
  key: string;
  items: readonly KitItem[];
};

/**
 * Ready-made systems built only from catalogue products.
 *
 * Sizing notes, checked against the catalogue specs:
 * - Batteries are 48–51.2 V LV modules, matching the 48 V inverters.
 * - Panel power stays under each inverter's max PV input.
 * - Strings: 8 × Hi-MO 6 per MPPT on the 6 kW, 16 per MPPT on the 12 kW,
 *   2 strings each, so one 2-in DC box covers both.
 * - Mounting sets are counted from `panelsPerSet`.
 */
export const kits = [
  {
    key: "home6",
    items: [
      { sku: "DEYE-SUN-6K-SG04LP1", quantity: 1 },
      { sku: "DEYE-SE-G5.1-PRO", quantity: 2 },
      { sku: "LONGI-HIMO6-LR5-54HTH-430", quantity: 16 },
      { sku: "K2-SINGLERAIL-PITCHED", quantity: 4 },
      { sku: "DC-BOX-2IN-2OUT", quantity: 1 },
      { sku: "STAUBLI-MC4-PAIR", quantity: 4 },
      { sku: "SOLAR-CABLE-6MM-RED-100", quantity: 1 },
    ],
  },
  {
    key: "business12",
    items: [
      { sku: "DEYE-SUN-12K-SG04LP3", quantity: 1 },
      { sku: "DEYE-SE-G5.1-PRO", quantity: 4 },
      { sku: "LONGI-HIMO6-LR5-54HTH-430", quantity: 32 },
      { sku: "MNT-BALLAST-FLAT-15", quantity: 32 },
      { sku: "DC-BOX-2IN-2OUT", quantity: 1 },
      { sku: "STAUBLI-MC4-PAIR", quantity: 4 },
      { sku: "SOLAR-CABLE-6MM-RED-100", quantity: 2 },
    ],
  },
  {
    key: "backup4",
    items: [
      { sku: "VICTRON-MP2-48-5000", quantity: 1 },
      { sku: "PYLONTECH-US5000", quantity: 2 },
    ],
  },
] as const satisfies readonly Kit[];

export type KitKey = (typeof kits)[number]["key"];

export const findProduct = (sku: string): Product => {
  const product = products.find((item) => item.sku === sku);
  if (!product) throw new Error(`Kit refers to unknown SKU ${sku}`);
  return product;
};

const sum = (
  items: readonly KitItem[],
  value: (product: Product) => number | undefined,
) =>
  items.reduce(
    (total, { sku, quantity }) =>
      total + (value(findProduct(sku)) ?? 0) * quantity,
    0,
  );

/** Headline figures for a kit, worked out from its products. */
export function kitSummary(items: readonly KitItem[]) {
  const inverter = items
    .map(({ sku }) => findProduct(sku))
    .find((product) => product.category === "inverters");

  return {
    inverterKw: inverter?.specs.powerKw ?? 0,
    phases: inverter?.specs.phases ?? 1,
    batteryKwh:
      Math.round(
        sum(items, (p) =>
          p.category === "batteries" ? p.specs.capacityKwh : undefined,
        ) * 100,
      ) / 100,
    pvKwp:
      Math.round(
        sum(items, (p) =>
          p.category === "panels" ? p.specs.powerW : undefined,
        ) / 10,
      ) / 100,
    maxPvInputW: inverter?.specs.maxPvInputW,
  };
}
