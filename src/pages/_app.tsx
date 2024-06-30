import { Fragment } from "react";
import Head from "next/head";

import "normalize.css";
import '@mantine/core/styles/Grid.css';
import '@mantine/core/styles/SimpleGrid.css';
import '@mantine/core/styles/Flex.css';

// css from mine
import "@/styles/globals.css";
import "@/styles/animations/hover.css";

import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>ray [2024 edition]</title>

        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, shrink-to-fit=no, initial-scale=1.0" />
      </Head>

      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </Fragment>
  );
}
