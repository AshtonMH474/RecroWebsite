import Nav from "@/components/Nav/Nav";
import { useTina } from "tinacms/dist/react";
import Footer from "@/components/Footer";
import Leadership from "@/components/Leadership/Leadership";
import BG from "@/components/BG";
import Landing from "@/components/Landing";
import Cards from "@/components/Cards/Cards";
import Learn from "@/components/Learn";
import Jobs from "@/components/Jobs/Jobs";
import useScrollToHash from "@/hooks/useScrollToHash";



export async function getStaticProps(){
    const {client} = await import('../../../tina/__generated__/databaseClient')
    const res = await client.queries.page({relativePath:'about.md'})
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

function About({res,navData,footerData,jobs}){
    const {data} = useTina(res)
    const {data:navContent} = useTina(navData)
    const {data:footerContent} = useTina(footerData)

    useScrollToHash(data.page.blocks, [
            'cards_id',
            'jobs_id',
            'leadership_id',
            'learn_id',
            'landing_id',
            'landing2_id'
        ]);

    return (
        <>
            <Nav res={navContent.nav} />
            <BG/>
             {data.page.blocks?.map((block,i) => {
                switch(block?.__typename){
                    case "PageBlocksLanding":
                    return <Landing key={i} {...block}/>;

                    case "PageBlocksCards":
                    return <Cards key={i}  {...block}/>;

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
    )
}

export default About