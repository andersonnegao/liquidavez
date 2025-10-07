import { Select } from "@mantine/core";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { locales, type AppLocale } from "@/src/i18n/config";

export default function LocaleSwitcher() {
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");

  const labels: Record<AppLocale, string> = {
    en: t("english"),
    pt: t("portuguese"),
  };

  const options = locales.map((locale) => ({
    value: locale,
    label: labels[locale],
  }));

  const handleChange = (value: string | null) => {
    if (!value) return;

    const targetLocale = value as AppLocale;
    const { asPath } = router;

    void router.push(asPath, asPath, { locale: targetLocale });
  };

  return (
    <Select
      aria-label={t("label")}
      size="md"
      value={router.locale ?? router.defaultLocale}
      onChange={handleChange}
      data={options}
      withinPortal={false}
    />
  );
}
