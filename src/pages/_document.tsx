import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      
      <title>ray [2024 edition]</title>

      {
        process.env.NODE_ENV === "development" && (
          <link rel={"stylesheet"} href={"/preview.css"} as={"style"}/>
        )
      }

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
