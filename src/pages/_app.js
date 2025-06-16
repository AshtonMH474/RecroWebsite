import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ModalProvider, Modal } from "@/context/Modal";
// import { TinaProvider,TinaCMS } from "tinacms";

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
  

  // const cms = new TinaCMS({ enabled: true });
  // return (
  //   <>
  //     <Head>
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     </Head>
  //     <TinaProvider cms={cms}>
  //       <ModalProvider>
  //         <Component {...pageProps} />
  //         <Modal /> {/* Modal rendered inline */}
  //       </ModalProvider>
  //     </TinaProvider>
  //   </>
  // );
}
