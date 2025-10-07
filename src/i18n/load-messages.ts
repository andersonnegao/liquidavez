import type { AbstractIntlMessages } from "next-intl";

import { defaultLocale, locales, type AppLocale } from "./config";

type MessageLoader = () => Promise<AbstractIntlMessages>;

const loaders: Record<AppLocale, MessageLoader> = {
  en: async () => (await import("./messages/en.json")).default,
  pt: async () => (await import("./messages/pt.json")).default,
};

export async function loadMessages(locale: string): Promise<AbstractIntlMessages> {
  const normalized = (locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : defaultLocale);

  return loaders[normalized]();
}
