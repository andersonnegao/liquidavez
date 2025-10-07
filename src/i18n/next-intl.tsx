import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { defaultLocale } from "./config";

export type MessagePrimitive = string | number | boolean | null | undefined;

export type AbstractIntlMessages = {
  [key: string]: MessagePrimitive | AbstractIntlMessages;
};

interface IntlContextValue {
  locale: string;
  messages: AbstractIntlMessages;
}

const IntlContext = createContext<IntlContextValue | undefined>(undefined);

interface NextIntlProviderProps {
  children: ReactNode;
  locale?: string;
  messages?: AbstractIntlMessages;
}

export function NextIntlProvider({
  children,
  locale,
  messages,
}: NextIntlProviderProps) {
  const value = useMemo<IntlContextValue>(
    () => ({
      locale: locale ?? defaultLocale,
      messages: messages ?? {},
    }),
    [locale, messages]
  );

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

function resolveMessage(
  messages: AbstractIntlMessages,
  key: string
): MessagePrimitive | AbstractIntlMessages | undefined {
  return key.split(".").reduce<
    MessagePrimitive | AbstractIntlMessages | undefined
  >((accumulator, segment) => {
    if (
      accumulator === undefined ||
      accumulator === null ||
      typeof accumulator === "string" ||
      typeof accumulator === "number" ||
      typeof accumulator === "boolean"
    ) {
      return undefined;
    }

    const nextValue = (accumulator as AbstractIntlMessages)[segment];

    if (nextValue === undefined) {
      return undefined;
    }

    return nextValue;
  }, messages);
}

function formatMessage(
  template: string,
  values?: Record<string, MessagePrimitive>
) {
  if (!values) return template;

  return Object.keys(values).reduce((formatted, token) => {
    const value = values[token];
    return formatted.replace(
      new RegExp(`\\{${token}\\}`, "g"),
      value !== undefined && value !== null ? String(value) : ""
    );
  }, template);
}

function missingTranslationKey(namespace: string | undefined, key: string) {
  return namespace ? `${namespace}.${key}` : key;
}

export function useTranslations(namespace?: string) {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error("useTranslations must be used within a NextIntlProvider");
  }

  const baseMessages = useMemo<AbstractIntlMessages>(() => {
    if (!namespace) {
      return context.messages;
    }

    const resolved = resolveMessage(context.messages, namespace);

    if (resolved && typeof resolved === "object") {
      return resolved as AbstractIntlMessages;
    }

    return {};
  }, [context.messages, namespace]);

  return (key: string, values?: Record<string, MessagePrimitive>) => {
    const message = resolveMessage(baseMessages, key);

    if (typeof message !== "string") {
      return missingTranslationKey(namespace, key);
    }

    return formatMessage(message, values);
  };
}

export function useLocale() {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error("useLocale must be used within a NextIntlProvider");
  }

  return context.locale;
}
