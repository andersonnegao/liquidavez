import dynamic from "next/dynamic";
import NextApp, { type AppContext, type AppProps } from "next/app";
import {
  NextIntlProvider,
  type AbstractIntlMessages,
} from "next-intl";
import type { Session } from "@supabase/auth-helpers-nextjs";

import "@/src/styles/main.css";

import ReactQueryProvider from "@/src/providers/react-query";
import SupabaseProvider from "@/src/providers/supabase";
import CustomMantineProvider from "@/src/providers/mantine";
import { loadMessages } from "@/src/i18n/load-messages";
import { defaultLocale } from "@/src/i18n/config";

type CustomPageProps = {
  messages?: AbstractIntlMessages;
  locale?: string;
  initialSession?: Session | null;
};

export default function App({ Component, pageProps }: AppProps<CustomPageProps>) {
  const Layout = dynamic(() => import("@/components/layout"), { ssr: false });

  return (
    <ReactQueryProvider>
      <SupabaseProvider initialSession={pageProps.initialSession ?? null}>
        <CustomMantineProvider>
          <NextIntlProvider
            locale={pageProps.locale ?? defaultLocale}
            messages={pageProps.messages ?? {}}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NextIntlProvider>
        </CustomMantineProvider>
      </SupabaseProvider>
    </ReactQueryProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  const locale =
    appContext.router.locale ?? appContext.router.defaultLocale ?? defaultLocale;

  const messages =
    appProps.pageProps?.messages ?? (await loadMessages(locale));

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      locale,
      messages,
    },
  };
};
