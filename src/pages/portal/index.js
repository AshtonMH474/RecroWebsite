import Footer from "@/components/Footer";
import Nav from "@/components/Nav/Nav";
import { useTina } from "tinacms/dist/react";
export async function getStaticProps() {
  const { client } = await import("../../../tina/__generated__/databaseClient");

  // Run TinaCMS queries in parallel
  const [ navData, footerData] = await Promise.all([
    
    client.queries.nav({ relativePath: "nav.md" }),
    client.queries.footer({ relativePath: "footer.md" }),
    
  ]);



  return {
    props: {
      navData,
      footerData,
      
    },
  };
}


function Portal({navData,footerData}){
    const {data:navContent} = useTina(navData)
    const {data:footerContent} = useTina(footerData)
    return (
        <>
        <Nav res={navContent.nav}  />
        <div style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }} className="landing flex flex-col items-center justify-center  w-full">
            <div className='w-90 md:w-150'>
                <h1 className="text-[32px] md:text-[40px] lg:text-[60px] font-bold text-center mb-4">Portal Coming Soon</h1>
            </div>
        </div>
        <Footer res={footerContent.footer}/>
        </>
    )
}

export default Portal