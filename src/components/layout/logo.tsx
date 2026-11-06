import { Link } from "@/i18n/navigation";

// TODO: Replace the drawn mark with the client's logo.svg once provided.
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
        <rect width="24" height="24" fill="currentColor" />
        <rect x="13" y="3" width="8" height="8" className="fill-brand" />
      </svg>
      <span className="leading-none">
        <span className="font-bold tracking-tight">Sunora</span>
        <span className="sr-only"> </span>
        <span className="mt-0.5 block font-mono text-[0.68rem] text-muted-foreground">
          components
        </span>
      </span>
    </Link>
  );
}
