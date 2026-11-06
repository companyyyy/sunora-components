import { routing } from "@/i18n/routing";

// Root layout for "/" only. Everything else uses the locale layout.
export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={routing.defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
