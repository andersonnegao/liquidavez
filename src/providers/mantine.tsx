import { useState } from "react";

import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
  createEmotionCache,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import "@fontsource/mulish/400.css";
import "@fontsource/mulish/600.css";
import "@fontsource/mulish/700.css";
import "@fontsource/mulish/800.css";

const fontFamily = "'Mulish', sans-serif";

export default function CustomMantineProvider({
  children,
}: {
  children: JSX.Element;
}) {
  // Iniciamos em modo escuro para dar ao site um visual mais moderno e de alta-contraste
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const emotionCache = createEmotionCache({ key: "mantine", prepend: false });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={emotionCache}
        theme={{
          colorScheme,
          primaryColor: 'fire',
          primaryShade: 5,
          colors: {
            fire: [
              '#fff7f0',
              '#ffefe1',
              '#ffd2b8',
              '#ffb487',
              '#ff8b4d',
              '#ff5f1f',
              '#e64f18',
              '#b43a10',
              '#8a2b0c',
              '#5e1b05',
            ],
            dark: [
              '#E2E8F0',
              '#A6A7AB',
              '#909296',
              '#5c5f66',
              '#373A40',
              '#2C2E33',
              'rgb(31 41 55)',
              'rgb(17 24 39)',
              '#141517',
              '#101113',
            ],
          },
          fontFamily,
          headings: { fontFamily },
        }}
      >
        <NotificationsProvider position="top-center" limit={5}>
          <ModalsProvider>{children}</ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
