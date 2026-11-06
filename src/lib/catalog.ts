import type { productCategories } from "./nav";

export type CategoryKey = (typeof productCategories)[number]["key"];

type ProductType =
  | "hybrid"
  | "offGrid"
  | "lifepo4"
  | "lifepo4Hv"
  | "monocrystalline"
  | "monocrystallineN"
  | "pitchedRoof"
  | "flatRoof"
  | "groundMount"
  | "connectors"
  | "cable"
  | "meter"
  | "protection"
  | "acCharger"
  | "dcCharger";

type Mounting = "rack" | "floor" | "modularStack" | "wallOrRack" | "dinRail";
type RoofType =
  "metalTileOrTrapezoidal" | "flatNoPenetration" | "trapezoidalOrSandwich";
type Material = "aluminiumAndSteel" | "aluminium" | "galvanizedSteel";
type Orientation = "portrait" | "portraitOrLandscape";
type Connector = "type2" | "type2Cable5m" | "type2Socket" | "ccs2Chademo";

type Specs = {
  powerKw?: number;
  phases?: number;
  batteryVoltageV?: number | "HV";
  mpptCount?: number;
  maxPvInputW?: number;
  wifi?: boolean;
  capacityKwh?: number;
  voltageV?: number | "HV";
  capacityAh?: number;
  cycles?: number;
  mounting?: Mounting;
  powerW?: number;
  efficiencyPercent?: number;
  cells?: number;
  bifacial?: boolean;
  dimensionsMm?: string;
  roofType?: RoofType;
  material?: Material;
  panelsPerSet?: number;
  orientation?: Orientation;
  tiltAngleDeg?: number;
  cableMm2?: number | string;
  maxVoltageV?: number;
  maxCurrentA?: number;
  lengthM?: number;
  uvResistant?: boolean;
  ipRating?: string;
  interface?: string;
  stringsIn?: number;
  surgeProtection?: boolean;
  connector?: Connector;
  solarIntegration?: boolean;
};

export type SpecKey = keyof Specs;

export type Product = {
  sku: string;
  category: CategoryKey;
  brand: string;
  model: string;
  type: ProductType;
  /** Specs render in the order written here. Leave out unknown values. */
  specs: Specs;
  warrantyYears: number;
  inStock: boolean;
};

/** Specs whose value is a key in the `catalog.options` messages. */
export const optionSpecs: readonly SpecKey[] = [
  "mounting",
  "roofType",
  "material",
  "orientation",
  "connector",
];

export const specUnits: Partial<Record<SpecKey, string>> = {
  powerKw: "kW",
  batteryVoltageV: "V",
  maxPvInputW: "W",
  capacityKwh: "kWh",
  voltageV: "V",
  capacityAh: "Ah",
  powerW: "W",
  efficiencyPercent: "%",
  dimensionsMm: "mm",
  tiltAngleDeg: "°",
  cableMm2: "mm²",
  maxVoltageV: "V",
  maxCurrentA: "A",
  lengthM: "m",
};

export const products: readonly Product[] = [
  {
    sku: "DEYE-SUN-6K-SG04LP1",
    category: "inverters",
    brand: "Deye",
    model: "SUN-6K-SG04LP1-EU",
    type: "hybrid",
    specs: {
      powerKw: 6,
      phases: 1,
      batteryVoltageV: 48,
      mpptCount: 2,
      maxPvInputW: 7800,
      wifi: true,
    },
    warrantyYears: 5,
    inStock: true,
  },
  {
    sku: "HUAWEI-SUN2000-5KTL-L1",
    category: "inverters",
    brand: "Huawei",
    model: "SUN2000-5KTL-L1",
    type: "hybrid",
    specs: {
      powerKw: 5,
      phases: 1,
      batteryVoltageV: "HV",
      mpptCount: 2,
      maxPvInputW: 7500,
      wifi: true,
    },
    warrantyYears: 10,
    inStock: true,
  },
  {
    sku: "VICTRON-MP2-48-5000",
    category: "inverters",
    brand: "Victron Energy",
    model: "MultiPlus-II 48/5000",
    type: "offGrid",
    specs: {
      powerKw: 4,
      phases: 1,
      batteryVoltageV: 48,
      mpptCount: 0,
      wifi: false,
    },
    warrantyYears: 5,
    inStock: false,
  },
  {
    sku: "DEYE-SUN-12K-SG04LP3",
    category: "inverters",
    brand: "Deye",
    model: "SUN-12K-SG04LP3-EU",
    type: "hybrid",
    specs: {
      powerKw: 12,
      phases: 3,
      batteryVoltageV: 48,
      mpptCount: 2,
      maxPvInputW: 15600,
      wifi: true,
    },
    warrantyYears: 5,
    inStock: true,
  },
  {
    sku: "PYLONTECH-US5000",
    category: "batteries",
    brand: "Pylontech",
    model: "US5000",
    type: "lifepo4",
    specs: {
      capacityKwh: 4.8,
      voltageV: 48,
      capacityAh: 100,
      cycles: 6000,
      mounting: "rack",
    },
    warrantyYears: 10,
    inStock: true,
  },
  {
    sku: "DYNESS-BX51100",
    category: "batteries",
    brand: "Dyness",
    model: "BX51100",
    type: "lifepo4",
    specs: {
      capacityKwh: 5.12,
      voltageV: 51.2,
      capacityAh: 100,
      cycles: 6000,
      mounting: "floor",
    },
    warrantyYears: 10,
    inStock: true,
  },
  {
    sku: "HUAWEI-LUNA2000-5-S0",
    category: "batteries",
    brand: "Huawei",
    model: "LUNA2000-5-S0",
    type: "lifepo4Hv",
    specs: {
      capacityKwh: 5,
      voltageV: "HV",
      cycles: 6000,
      mounting: "modularStack",
    },
    warrantyYears: 10,
    inStock: false,
  },
  {
    sku: "DEYE-SE-G5.1-PRO",
    category: "batteries",
    brand: "Deye",
    model: "SE-G5.1 Pro-B",
    type: "lifepo4",
    specs: {
      capacityKwh: 5.12,
      voltageV: 51.2,
      capacityAh: 100,
      cycles: 6000,
      mounting: "wallOrRack",
    },
    warrantyYears: 10,
    inStock: true,
  },
  {
    sku: "LONGI-HIMO6-LR5-54HTH-430",
    category: "panels",
    brand: "LONGi",
    model: "Hi-MO 6 430 W",
    type: "monocrystalline",
    specs: {
      powerW: 430,
      efficiencyPercent: 22,
      cells: 108,
      bifacial: false,
      dimensionsMm: "1722 × 1134 × 30",
    },
    warrantyYears: 25,
    inStock: true,
  },
  {
    sku: "JA-JAM54D40-440",
    category: "panels",
    brand: "JA Solar",
    model: "JAM54D40 440 W Bifacial",
    type: "monocrystallineN",
    specs: {
      powerW: 440,
      efficiencyPercent: 22.5,
      cells: 108,
      bifacial: true,
      dimensionsMm: "1762 × 1134 × 30",
    },
    warrantyYears: 30,
    inStock: true,
  },
  {
    sku: "TRINA-VERTEX-S-TSM-NEG9R-445",
    category: "panels",
    brand: "Trina Solar",
    model: "Vertex S+ 445 W",
    type: "monocrystallineN",
    specs: {
      powerW: 445,
      efficiencyPercent: 22.3,
      cells: 144,
      bifacial: false,
      dimensionsMm: "1762 × 1134 × 30",
    },
    warrantyYears: 25,
    inStock: false,
  },
  {
    sku: "JINKO-TIGER-NEO-580",
    category: "panels",
    brand: "Jinko Solar",
    model: "Tiger Neo 580 W",
    type: "monocrystallineN",
    specs: {
      powerW: 580,
      efficiencyPercent: 22.4,
      cells: 144,
      bifacial: true,
      dimensionsMm: "2278 × 1134 × 30",
    },
    warrantyYears: 30,
    inStock: true,
  },
  {
    sku: "K2-SINGLERAIL-PITCHED",
    category: "mounting",
    brand: "K2 Systems",
    model: "SingleRail for pitched roofs",
    type: "pitchedRoof",
    specs: {
      roofType: "metalTileOrTrapezoidal",
      material: "aluminiumAndSteel",
      panelsPerSet: 4,
      orientation: "portrait",
    },
    warrantyYears: 12,
    inStock: true,
  },
  {
    sku: "MNT-BALLAST-FLAT-15",
    category: "mounting",
    brand: "SolarFix",
    model: "Ballast system for flat roofs, 15°",
    type: "flatRoof",
    specs: {
      roofType: "flatNoPenetration",
      material: "aluminium",
      panelsPerSet: 1,
      tiltAngleDeg: 15,
    },
    warrantyYears: 10,
    inStock: true,
  },
  {
    sku: "MNT-GROUND-2X10",
    category: "mounting",
    brand: "SolarFix",
    model: "Pile-driven ground structure, 2×10 panels",
    type: "groundMount",
    specs: {
      material: "galvanizedSteel",
      panelsPerSet: 20,
      tiltAngleDeg: 30,
    },
    warrantyYears: 15,
    inStock: false,
  },
  {
    sku: "MNT-MINIRAIL-TRAP",
    category: "mounting",
    brand: "SolarFix",
    model: "Mini rail for trapezoidal sheet, set for 1 panel",
    type: "pitchedRoof",
    specs: {
      roofType: "trapezoidalOrSandwich",
      material: "aluminium",
      panelsPerSet: 1,
      orientation: "portraitOrLandscape",
    },
    warrantyYears: 10,
    inStock: true,
  },
  {
    sku: "STAUBLI-MC4-PAIR",
    category: "accessories",
    brand: "Stäubli",
    model: "MC4 connectors, pair",
    type: "connectors",
    specs: {
      cableMm2: "4–6",
      maxVoltageV: 1500,
      maxCurrentA: 39,
      ipRating: "IP68",
    },
    warrantyYears: 2,
    inStock: true,
  },
  {
    sku: "SOLAR-CABLE-6MM-RED-100",
    category: "accessories",
    brand: "Prysmian",
    model: "Solar cable 6 mm², red, 100 m coil",
    type: "cable",
    specs: {
      cableMm2: 6,
      maxVoltageV: 1500,
      lengthM: 100,
      uvResistant: true,
    },
    warrantyYears: 2,
    inStock: true,
  },
  {
    sku: "HUAWEI-DTSU666-H",
    category: "accessories",
    brand: "Huawei",
    model: "DTSU666-H smart meter, 3-phase",
    type: "meter",
    specs: {
      phases: 3,
      interface: "RS485",
      maxCurrentA: 100,
      mounting: "dinRail",
    },
    warrantyYears: 2,
    inStock: true,
  },
  {
    sku: "DC-BOX-2IN-2OUT",
    category: "accessories",
    brand: "SolarFix",
    model: "DC protection box, 2 in / 2 out, fuses and surge protection",
    type: "protection",
    specs: {
      stringsIn: 2,
      maxVoltageV: 1000,
      surgeProtection: true,
      ipRating: "IP65",
    },
    warrantyYears: 2,
    inStock: false,
  },
  {
    sku: "HUAWEI-SCHARGER-7KS",
    category: "evChargers",
    brand: "Huawei",
    model: "SCharger-7KS-S0",
    type: "acCharger",
    specs: {
      powerKw: 7.4,
      phases: 1,
      connector: "type2",
      solarIntegration: true,
      ipRating: "IP54",
    },
    warrantyYears: 3,
    inStock: true,
  },
  {
    sku: "WALLBOX-PULSAR-PLUS-22",
    category: "evChargers",
    brand: "Wallbox",
    model: "Pulsar Plus 22 kW",
    type: "acCharger",
    specs: {
      powerKw: 22,
      phases: 3,
      connector: "type2Cable5m",
      solarIntegration: true,
      ipRating: "IP54",
    },
    warrantyYears: 2,
    inStock: true,
  },
  {
    sku: "ZAPTEC-GO-22",
    category: "evChargers",
    brand: "Zaptec",
    model: "Go 22 kW",
    type: "acCharger",
    specs: {
      powerKw: 22,
      phases: 3,
      connector: "type2Socket",
      solarIntegration: false,
      ipRating: "IP54",
    },
    warrantyYears: 3,
    inStock: false,
  },
  {
    sku: "EKOENERGETYKA-DC-60",
    category: "evChargers",
    brand: "Ekoenergetyka",
    model: "DC fast charger 60 kW",
    type: "dcCharger",
    specs: {
      powerKw: 60,
      phases: 3,
      connector: "ccs2Chademo",
      solarIntegration: false,
      ipRating: "IP54",
    },
    warrantyYears: 2,
    inStock: true,
  },
];

export const productsIn = (category: CategoryKey) =>
  products.filter((product) => product.category === category);

/** Brand names A-Z, each with the categories it appears in. */
export const brands = [...new Set(products.map(({ brand }) => brand))]
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({
    name,
    categories: [
      ...new Set(
        products
          .filter((product) => product.brand === name)
          .map((product) => product.category),
      ),
    ],
  }));
