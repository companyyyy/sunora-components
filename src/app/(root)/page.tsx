import { routing } from "@/i18n/routing";

// A static export has no proxy, so "/" redirects from the page itself. The URL
// is relative so it also works when the site is served from a base path.
export default function RootPage() {
  const target = `${routing.defaultLocale}/`;

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <a href={target}>Sunora Components</a>
    </>
  );
}
