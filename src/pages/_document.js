import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/4374141.js"
        ></script>
      </Head>
      <body className="not-ready">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
