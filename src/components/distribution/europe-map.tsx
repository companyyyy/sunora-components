import { geoAzimuthalEqualArea, geoPath } from "d3-geo";
import type { FeatureCollection, MultiPoint } from "geojson";
import { useTranslations } from "next-intl";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import {
  destinations,
  hub,
  servedCountryIds,
  type LonLat,
} from "@/lib/distribution";

const width = 640;
const height = 520;

// Rendered at build time: the browser gets plain SVG and no map code.
const topology = world as unknown as Topology<{
  countries: GeometryCollection;
}>;
const countries = feature(
  topology,
  topology.objects.countries,
) as FeatureCollection;

/** Corners of the area to show: most of Europe, Iberia to the Black Sea. */
const frame: MultiPoint = {
  type: "MultiPoint",
  coordinates: [
    [-6, 38],
    [40, 38],
    [-6, 62],
    [40, 62],
  ],
};

const projection = geoAzimuthalEqualArea()
  .rotate([-17, -51])
  .fitExtent(
    [
      [16, 16],
      [width - 16, height - 16],
    ],
    frame,
  )
  .clipExtent([
    [0, 0],
    [width, height],
  ]);

const path = geoPath(projection).digits(1);

const point = (coordinates: LonLat) => {
  const [x, y] = projection([...coordinates]) ?? [0, 0];
  return { x: Math.round(x), y: Math.round(y) };
};

/** A curved route, bowed to the right of the straight line hub → city. */
function route(from: LonLat, to: LonLat) {
  const a = point(from);
  const b = point(to);
  const bow = 0.18;
  const cx = (a.x + b.x) / 2 - (b.y - a.y) * bow;
  const cy = (a.y + b.y) / 2 + (b.x - a.x) * bow;
  return `M${a.x} ${a.y}Q${Math.round(cx)} ${Math.round(cy)} ${b.x} ${b.y}`;
}

const labelOffset = {
  left: { dx: -12, dy: 6, anchor: "end" },
  right: { dx: 12, dy: 6, anchor: "start" },
  below: { dx: 0, dy: 28, anchor: "middle" },
} as const;

const shapes = countries.features.map((country) => ({
  id: String(country.id),
  d: path(country) ?? "",
}));

/** Map of delivery routes from the Tallinn hub. The city list beside it carries the same facts. */
export function EuropeMap({ labelledBy }: { labelledBy: string }) {
  const t = useTranslations("distribution.cities");
  const origin = point(hub.coordinates);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={labelledBy}
      className="h-auto w-full bg-card"
    >
      <g className="stroke-background" strokeWidth={0.75}>
        {shapes.map(({ id, d }) => (
          <path
            key={id}
            d={d}
            className={servedCountryIds.has(id) ? "fill-brand" : "fill-muted"}
          />
        ))}
      </g>

      <g fill="none" className="stroke-foreground" strokeWidth={2}>
        {destinations.map(({ key, coordinates }) => (
          <path
            key={key}
            d={route(hub.coordinates, coordinates)}
            strokeDasharray="6 5"
          />
        ))}
      </g>

      <g className="fill-foreground text-[16px] font-medium">
        {destinations.map(({ key, coordinates, label }) => {
          const { x, y } = point(coordinates);
          const { dx, dy, anchor } = labelOffset[label];
          return (
            <g key={key}>
              <circle
                cx={x}
                cy={y}
                r={6}
                className="stroke-card"
                strokeWidth={2}
              />
              <text
                x={x + dx}
                y={y + dy}
                textAnchor={anchor}
                className="stroke-card"
                strokeWidth={4}
                paintOrder="stroke"
              >
                {t(key)}
              </text>
            </g>
          );
        })}

        <rect
          x={origin.x - 9}
          y={origin.y - 9}
          width={18}
          height={18}
          className="stroke-card"
          strokeWidth={2}
        />
        <text
          x={origin.x + 16}
          y={origin.y + 6}
          className="stroke-card font-semibold"
          strokeWidth={4}
          paintOrder="stroke"
        >
          {t(hub.key)}
        </text>
      </g>
    </svg>
  );
}
