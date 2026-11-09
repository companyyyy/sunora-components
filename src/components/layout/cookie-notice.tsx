"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";

/** Listed in the cookie policy. Rename there too if this changes. */
const storageKey = "cookie-notice";
const listeners = new Set<() => void>();

function readDismissed() {
  try {
    return window.localStorage.getItem(storageKey) === "dismissed";
  } catch {
    // Storage blocked (private mode, strict settings): show the notice.
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Notice, not a consent banner: the site sets no cookies and stores only
 * choices the visitor made, which needs no consent. Hidden on the server
 * render so the static HTML never flashes it.
 */
export function CookieNotice() {
  const t = useTranslations("cookieNotice");
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => true);

  if (dismissed) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(storageKey, "dismissed");
    } catch {
      // Nothing to remember it in; it closes for this page view only.
    }
    listeners.forEach((listener) => listener());
  }

  return (
    <div
      role="region"
      aria-label={t("more")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-foreground bg-inverse text-inverse-foreground"
    >
      <div className="container-site flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          {t("text")}{" "}
          <Link
            href="/legal/cookies"
            className="underline underline-offset-4 hover:no-underline"
          >
            {t("more")}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="h-10 shrink-0 self-start bg-brand px-6 font-semibold text-brand-foreground hover:opacity-85 sm:self-auto"
        >
          {t("ok")}
        </button>
      </div>
    </div>
  );
}
