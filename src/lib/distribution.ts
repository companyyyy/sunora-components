import type { CategoryKey } from "./catalog";

/** [longitude, latitude] */
export type LonLat = readonly [number, number];

type City = {
  /** Key in the `distribution.cities` messages. */
  key: string;
  coordinates: LonLat;
  /** ISO 3166-1 numeric code, as used by the world-atlas country ids. */
  countryId: string;
  /** Side of the dot the map label sits on. */
  label: "left" | "right" | "below";
};

/** Where shipments leave from. Matches the address in `site.ts`. */
export const hub = {
  key: "tallinn",
  coordinates: [24.75, 59.44],
  countryId: "233",
  label: "right",
} as const satisfies City;

/** Cities we deliver to. Keys live in the `distribution.cities` messages. */
export const destinations = [
  {
    key: "kyiv",
    coordinates: [30.52, 50.45],
    countryId: "804",
    label: "right",
  },
  {
    key: "odesa",
    coordinates: [30.73, 46.48],
    countryId: "804",
    label: "right",
  },
  {
    key: "bucharest",
    coordinates: [26.1, 44.43],
    countryId: "642",
    label: "below",
  },
  {
    key: "chisinau",
    coordinates: [28.86, 47.01],
    countryId: "498",
    label: "left",
  },
  {
    key: "warsaw",
    coordinates: [21.01, 52.23],
    countryId: "616",
    label: "left",
  },
] as const satisfies readonly City[];

/** Countries shaded on the map: the hub's and every destination's. */
export const servedCountryIds = new Set<string>(
  [hub, ...destinations].map((city) => city.countryId),
);

/** The brands we lead with. Names are trademarks: never translate them. */
export const coreBrands = [
  { name: "Felicity Solar", categories: ["inverters", "batteries", "panels"] },
  { name: "MUST", categories: ["inverters", "batteries"] },
  { name: "DAH Solar", categories: ["panels"] },
  { name: "LONGi", categories: ["panels"] },
  { name: "Deye", categories: ["inverters", "batteries"] },
] as const satisfies readonly {
  name: string;
  categories: readonly CategoryKey[];
}[];
