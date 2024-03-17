import "normalize.css";
import '@mantine/core/styles.css';

// css from mine
import "@/styles/globals.css";
import "@/styles/animations/hover.css";

import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Component {...pageProps} />;
    </MantineProvider>
  );
}
