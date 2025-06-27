
import Landing from "../components/Landing";
import {useTina} from 'tinacms/dist/react'
import Nav from "../components/Nav";
import Learn from "@/components/Learn";
import Footer from "@/components/Footer";
import { useExpertise } from "@/context/ExpertiseContext";
import BG from "@/components/BG";
import Cards from "../components/Cards/Cards";
import Leadership from "@/components/Leadership/Leadership";
import Jobs from "@/components/Jobs/Jobs";



export async function getStaticProps(){
    const {client} = await import("../../tina/__generated__/databaseClient");
    const res = await client.queries.page({relativePath:'home.md'})
    const navRes = await client.queries.nav({relativePath:'nav.md'})
    const footerRes = await client.queries.footer({relativePath:"footer.md"})
    const resJobs = await fetch('https://ats.recro.com/api/joblistings')
    const jobs = await resJobs.json()
    return {
      props:{
        res:res,
        navData:navRes,
        footerData:footerRes,
        jobs:jobs
      }
    }
  
}


export default function Home({res,navData,footerData,jobs}) {

 
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
      <BG />
     {data.page.blocks?.map((block,i) => {
  switch(block?.__typename){
    case "PageBlocksLanding":
      return <Landing key={i} {...block}/>;

    case "PageBlocksCards":
      return <Cards key={i} ref={expertiseRef} {...block}/>;

    case "PageBlocksLeadership":{
      return <Leadership key={i} {...block}/>
    }
    case "PageBlocksLearnTeam":
      return <Learn key={i} {...block}/>;
    case "PageBlocksJobs":
      return <Jobs key={i} jobs={jobs} {...block}/>;
    default:
      console.warn("Unknown block type:", block?.__typename);
      return null;
  }
})}
      <Footer res={footerContent.footer}/>
      

  
   
    </>
  );
}




