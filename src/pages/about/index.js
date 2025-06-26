import Nav from "@/components/Nav";
import { useTina } from "tinacms/dist/react";
import Footer from "@/components/Footer";
import { useExpertise } from "@/context/ExpertiseContext";
import Leadership from "@/components/Leadership/Leadership";
import BG from "@/components/BG";
import Landing from "@/components/Landing";
import Cards from "@/components/Cards/Cards";
import Learn from "@/components/Learn";



export async function getStaticProps(){
    const {client} = await import('../../../tina/__generated__/databaseClient')
    const res = await client.queries.page({relativePath:'about.md'})
    const navRes = await client.queries.nav({relativePath:'nav.md'})
    const footerRes = await client.queries.footer({relativePath:"footer.md"})
    return {
      props:{
        res:res,
        navData:navRes,
        footerData:footerRes
      }
    }
  
}

function About({res,navData,footerData}){
   
    const {expertiseRef} = useExpertise()
   

    const {data} = useTina(res)
    const {data:navContent} = useTina(navData)
    const {data:footerContent} = useTina(footerData)

    const scrollToExpertise = () => {
        expertiseRef.current?.scrollToHeading();
    };
    return (
        <>
            <Nav res={navContent.nav} onExpertiseClick={scrollToExpertise}/>
            <BG/>
             {data.page.blocks?.map((block,i) => {
        switch(block?.__typename){
          case "PageBlocksLanding":{
            return <Landing key={i} {...block}/>
          }
          case "PageBlocksCards":{
            return <Cards key={i} {...block}/>
          }
          case "PageBlocksLeadership":{
            return <Leadership key={i} {...block}/>
          }
           case "PageBlocksLearnTeam":
              return <Learn key={i} {...block}/>;
          default:
          console.warn("Unknown block type:", block?.__typename);
          return null;
        }
      })}

            
            
            <Footer res={footerContent.footer}/>
        </>
    )
}

export default About