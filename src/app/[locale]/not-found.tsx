import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="container-site py-24 text-center">
      <p className="text-sm font-semibold text-muted-foreground tabular-nums">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <Button
        className="mt-6"
        size="lg"
        nativeButton={false}
        render={<Link href="/" />}
      >
        {t("backHome")}
      </Button>
    </div>
  );
}
