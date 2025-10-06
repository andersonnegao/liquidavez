import { ReactNode } from "react";
import Head from "next/head";

import { Box } from "@mantine/core";

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>liquidavez — Mercado online</title>
        <meta
          name="description"
          content="Compre mantimentos online com rapidez e entrega local"
        />
      </Head>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
        })}
      >
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="container mx-auto flex flex-1 flex-col px-3 py-10">
            {children}
          </main>

          <Footer />
        </div>
      </Box>
    </>
  );
}
