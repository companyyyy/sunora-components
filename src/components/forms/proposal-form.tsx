"use client";

import { useTranslations } from "next-intl";
import { useId, useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

const countries = [
  "ukraine",
  "moldova",
  "romania",
  "poland",
  "estonia",
  "latvia",
  "lithuania",
  "other",
] as const;
const turnovers = ["under100k", "to500k", "to1m", "to5m", "over5m"] as const;
const services = ["wholesale", "dealer", "project", "delivery"] as const;

/**
 * The site is static, so requests go through FormSubmit, which emails them
 * to the company address. The first request triggers an activation email
 * to that address; nothing is delivered until someone clicks the link in it.
 * NEXT_PUBLIC_FORM_ENDPOINT overrides this with another FormSubmit-style
 * JSON endpoint.
 *
 * Changing the service changes where personal data goes: update sections 3,
 * 5 and 6 of the privacy policy (`legal.privacy` messages) in the same change.
 */
const endpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${site.email}`;

type Status = "idle" | "sending" | "sent" | "error";

const control =
  "h-11 w-full border border-input bg-card px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

function Field({
  label,
  required,
  children,
  wide,
}: {
  label: string;
  required?: boolean;
  children: (id: string) => ReactNode;
  wide?: boolean;
}) {
  const id = useId();
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            {" "}
            *
          </span>
        )}
      </label>
      {children(id)}
    </div>
  );
}

/** Request for a wholesale proposal: who is asking, how much they buy, what they need. */
export function ProposalForm() {
  const t = useTranslations("form");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    > & {
      country: (typeof countries)[number];
      turnover: (typeof turnovers)[number];
      service: (typeof services)[number];
    };

    // Readable values, so the request makes sense in an inbox.
    const fields = {
      [t("firstName")]: data.firstName,
      [t("company")]: data.company,
      [t("phone")]: data.phone,
      [t("email")]: data.email || "—",
      [t("city")]: data.city,
      [t("country")]: t(`countries.${data.country}`),
      [t("turnover")]: t(`turnovers.${data.turnover}`),
      [t("service")]: t(`services.${data.service}`),
      [t("message")]: data.message,
    };
    const subject = `${t("subject")}: ${data.company}`;

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...fields,
          _subject: subject,
          // Lets "Reply" in the inbox go straight to the visitor.
          ...(data.email && { _replyto: data.email }),
          _template: "table",
          // Bots fill every field; FormSubmit drops requests where this is set.
          _honey: data.website ?? "",
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: string | boolean;
      };
      // FormSubmit answers 200 with success "false" when it refuses a request.
      if (!response.ok || String(result.success) !== "true") {
        throw new Error(String(response.status));
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-x-6 gap-y-5 border border-foreground bg-card p-5 sm:grid-cols-2 md:p-8"
    >
      {/* Spam trap: hidden from people and screen readers. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <Field label={t("firstName")} required>
        {(id) => (
          <input
            id={id}
            name="firstName"
            required
            autoComplete="given-name"
            className={control}
          />
        )}
      </Field>
      <Field label={t("company")} required>
        {(id) => (
          <input
            id={id}
            name="company"
            required
            autoComplete="organization"
            className={control}
          />
        )}
      </Field>
      <Field label={t("phone")} required>
        {(id) => (
          <input
            id={id}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={control}
          />
        )}
      </Field>
      <Field label={t("email")}>
        {(id) => (
          <input
            id={id}
            name="email"
            type="email"
            autoComplete="email"
            className={control}
          />
        )}
      </Field>
      <Field label={t("city")} required>
        {(id) => (
          <input
            id={id}
            name="city"
            required
            autoComplete="address-level2"
            className={control}
          />
        )}
      </Field>
      <Field label={t("country")} required>
        {(id) => (
          <select
            id={id}
            name="country"
            required
            defaultValue=""
            className={control}
          >
            <option value="" disabled>
              {t("choose")}
            </option>
            {countries.map((key) => (
              <option key={key} value={key}>
                {t(`countries.${key}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field label={t("turnover")} required>
        {(id) => (
          <select
            id={id}
            name="turnover"
            required
            defaultValue=""
            className={control}
          >
            <option value="" disabled>
              {t("choose")}
            </option>
            {turnovers.map((key) => (
              <option key={key} value={key}>
                {t(`turnovers.${key}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field label={t("service")} required>
        {(id) => (
          <select
            id={id}
            name="service"
            required
            defaultValue=""
            className={control}
          >
            <option value="" disabled>
              {t("choose")}
            </option>
            {services.map((key) => (
              <option key={key} value={key}>
                {t(`services.${key}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field label={t("message")} required wide>
        {(id) => (
          <textarea
            id={id}
            name="message"
            required
            rows={5}
            placeholder={t("messagePlaceholder")}
            className={`${control} h-auto py-2`}
          />
        )}
      </Field>

      <label className="flex items-start gap-3 text-sm sm:col-span-2">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-5 shrink-0 accent-foreground"
        />
        <span>
          {t.rich("consent", {
            company: site.legalName,
            privacy: (chunks) => (
              <Link
                href="/legal/privacy"
                className="underline underline-offset-4 hover:no-underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center justify-center bg-brand px-6 font-semibold text-brand-foreground hover:opacity-85 disabled:opacity-60"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
        <p role="status" className="text-sm">
          {status === "sent" && t("sent")}
          {status === "error" &&
            t("error", { email: site.email, phone: site.phone })}
        </p>
      </div>
    </form>
  );
}
