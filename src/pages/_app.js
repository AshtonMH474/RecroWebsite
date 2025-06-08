import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ModalProvider, Modal } from "@/context/Modal";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ModalProvider>
        <Component {...pageProps} />
        <Modal />  {/* <-- Add this here! */}
      </ModalProvider>
    </>
  );
}
