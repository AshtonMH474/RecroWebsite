import Head from "next/head"; // ✅ Import Head from next/head
import "@/styles/globals.css";
import "@/styles/gears.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* ✅ Move viewport meta tag here */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

