import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"/> */}

        {/* <link rel="icon" href="/favicon.ico" type="image/x-icon" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        

        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png"/>
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
