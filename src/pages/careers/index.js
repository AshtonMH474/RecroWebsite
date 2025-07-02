import BG from '@/components/BG'
import Cards from '@/components/Cards/Cards'
import Footer from '@/components/Footer'
import Jobs from '@/components/Jobs/Jobs'
import Landing from '@/components/Landing'
import Landing2 from '@/components/Landing2'
import Leadership from '@/components/Leadership/Leadership'
import Learn from '@/components/Learn'
import Nav from '@/components/Nav/Nav'
import { useExpertise } from '@/context/ExpertiseContext'
import { useEffect } from 'react'
import { useTina } from 'tinacms/dist/react'




export async function getStaticProps(){
    const {client} = await import('../../../tina/__generated__/databaseClient')
    const res = await client.queries.page({relativePath:'careers.md'})
    const navRes = await client.queries.nav({relativePath:'nav.md'})
    const footerRes = await client.queries.footer({relativePath:"footerCareers.md"})
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


function Careers({res,navData,footerData,jobs}){
    const {data} = useTina(res)
    const {data:navContent} = useTina(navData)
    const {data:footerContent} = useTina(footerData)
    const {expertiseRef} = useExpertise()

     const scrollToExpertise = () => {
        expertiseRef.current?.scrollToHeading();
    };

   useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#jobs") {
      setTimeout(() => {
        const el = document.getElementById("jobs-section");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300); // wait a bit for DOM to be ready
    }
  }, []);

  useEffect(() => {
   
     if (typeof window !== "undefined" && window.location.hash === `#${data.page.blocks[1].cards_id}`) {
      setTimeout(() => {
        const el = document.getElementById(data.page.blocks[1].cards_id);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300); // wait a bit for DOM to be ready
    }
  },[])

    return(
        <>
            <Nav  res={navContent.nav} onExpertiseClick={scrollToExpertise} />
            <BG/>
             {data.page.blocks?.map((block,i) => {
                switch(block?.__typename){
                    case "PageBlocksLanding":
                    return <Landing key={i} {...block}/>;
                    case "PageBlocksLanding2":
                        return <Landing2 key={i} {...block}/>;
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
    )
}

export default Careers