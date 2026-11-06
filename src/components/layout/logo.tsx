import { Link } from "@/i18n/navigation";

// TODO: Replace the drawn mark with the client's logo.svg once provided.
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 text-brand">
        <circle cx="12" cy="12" r="5" fill="currentColor" />
        <path
          d="M12 1.500v3M12 19.500v3M1.500 12h3M19.500 12h3M4.600 4.600l2.100 2.100M17.300 17.300l2.100 2.100M4.600 19.400l2.100-2.100M17.300 6.700l2.100-2.100"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="leading-none">
        Sunora<span className="sr-only"> </span>
        <span className="block text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
          Components
        </span>
      </span>
    </Link>
  );
}
