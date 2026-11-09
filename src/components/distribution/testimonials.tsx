import { useTranslations } from "next-intl";
import { testimonials } from "@/lib/testimonials";

/** Partner reviews. Renders nothing while the list is empty. */
export function Testimonials() {
  const t = useTranslations("testimonials");

  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials"
      className="container-site py-12 md:py-16"
    >
      <h2
        id="testimonials"
        className="text-3xl font-semibold tracking-tight md:text-4xl"
      >
        {t("heading")}
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {testimonials.map(({ quote, name, role, city }) => (
          <li key={quote}>
            <figure className="flex h-full flex-col justify-between gap-8 border-t-4 border-brand bg-card p-6 md:p-8">
              <blockquote className="text-lg">
                <p>“{quote}”</p>
              </blockquote>
              <figcaption className="text-sm">
                {name && <span className="block font-semibold">{name}</span>}
                <span
                  className={
                    name ? "block text-muted-foreground" : "block font-semibold"
                  }
                >
                  {role}
                </span>
                <span className="block text-muted-foreground">{city}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
