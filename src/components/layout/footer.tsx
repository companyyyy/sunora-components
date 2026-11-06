import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { footerGroups, legalLinks, productCategories } from "@/lib/nav";
import { site } from "@/lib/site";

const linkClass =
  "text-inverse-muted hover:text-inverse-foreground hover:underline";

export function Footer() {
  const t = useTranslations();
  const { street, postalCode, city, country } = site.address;

  return (
    <footer className="bg-inverse text-sm text-inverse-foreground">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="text-base font-semibold">{site.name}</p>
          <p lang="et" className="mt-1 font-medium text-brand">
            {site.slogan}
          </p>
          <p className="mt-2 text-inverse-muted">{t("footer.tagline")}</p>
        </div>

        <nav aria-labelledby="footer-products" className="lg:col-span-2">
          <h2 id="footer-products" className="font-semibold">
            {t("footer.products")}
          </h2>
          <ul className="mt-3 space-y-2">
            {productCategories.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className={linkClass}>
                  {t(`categories.${key}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {footerGroups.map((group) => (
          <nav
            key={group.key}
            aria-labelledby={`footer-${group.key}`}
            className="lg:col-span-2"
          >
            <h2 id={`footer-${group.key}`} className="font-semibold">
              {t(`footer.${group.key}`)}
            </h2>
            <ul className="mt-3 space-y-2">
              {group.links.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={linkClass}>
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <address className="not-italic lg:col-span-3">
          <p className="font-semibold">{site.legalName}</p>
          <p className="mt-3 text-inverse-muted">
            {street}
            <br />
            {postalCode} {city}, {country}
          </p>
          <p className="mt-3 space-y-1">
            <a
              href={site.phoneHref}
              className={`block tabular-nums ${linkClass}`}
            >
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className={`block ${linkClass}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-3 text-inverse-muted tabular-nums">
            {t("footer.vatId")}: {site.vatId}
          </p>
        </address>
      </div>

      <div className="border-t border-white/15">
        <div className="container-site flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-inverse-muted">
            © {new Date().getFullYear()} {site.legalName}. {t("footer.rights")}
          </p>
          <nav aria-label={t("footer.legal")}>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {legalLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={linkClass}>
                    {t(`pages.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
