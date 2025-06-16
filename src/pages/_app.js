import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
        <ExpertiseProvider>
          <Component {...pageProps} />
        </ExpertiseProvider>
    
    </>
  );
  
}
