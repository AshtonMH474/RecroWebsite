
import Landing from "../components/Landing";
import {useTina} from 'tinacms/dist/react'
import Learn from "@/components/Learn";
import Footer from "@/components/Footer";
import Cards from "../components/Cards/Cards";
import Leadership from "@/components/Leadership/Leadership";
import Jobs from "@/components/Jobs/Jobs";
import Nav from "@/components/Nav/Nav";
import useScrollToHash from "@/hooks/useScrollToHash";
import SolutionsGrid from "@/components/SolutionsGrid/SolutionsGrid";
import PerformanceGrid from "@/components/PerformanceGrid/PerformanceGrid";
import Landing2 from "@/components/Landing2";
import Testimonies from "@/components/Testimonies/Testimonies";
import PartnersGrid from "@/components/Partners/PartnersGrid";
import PriorityPartners from "@/components/Partners/PriorityPartners/PriorityPartners";




export async function getStaticProps() {
  const { client } = await import("../../tina/__generated__/databaseClient");

  // Run TinaCMS queries in parallel
  const [pageData, navData, footerData, solutionData,partnerData,performanceData] = await Promise.all([
    client.queries.page({ relativePath: "home.md" }),
    client.queries.nav({ relativePath: "nav.md" }),
    client.queries.footer({ relativePath: "footer.md" }),
    client.queries.solutionConnection(),
    client.queries.partnerConnection({first:100}),
    client.queries.performanceConnection(),
    
  ]);


  return {
    props: {
      res: pageData,
      navData,
      footerData,
      solutionData,
      partnerData,
      performanceData
    },
  };
}



export default function Home({res,navData,footerData,solutionData,partnerData,performanceData}) {

  const {data} = useTina(res)
  const {data:navContent} = useTina(navData)
  const {data:footerContent} = useTina(footerData)
  const { data: solutionContent } = useTina(solutionData);
  const { data: partnersContent } = useTina(partnerData);
  const {data: performanceContent} = useTina(performanceData)

  useScrollToHash(data.page.blocks, [
          'cards_id',
          'jobs_id',
          'leadership_id',
          'learn_id',
          'landing_id',
          'landing2_id',
          'testimonies_id',
          'solutions_id',
          "partners_id",
          "performance_id"


      ]);
      
      
  return (
  
    <>
      <Nav res={navContent.nav}  />

     {data.page.blocks?.map((block,i) => {
                switch(block?.__typename){
                    case "PageBlocksLanding":
                    return <Landing key={i} {...block}/>;
                    case "PageBlocksLanding2":
                        return <Landing2 key={i} {...block}/>;
                    case "PageBlocksCards":
                        return <Cards key={i}  {...block}/>;
                    case "PageBlocksLeadership":{
                        return <Leadership key={i} {...block}/>
                    }
                    case "PageBlocksLearnTeam":
                    return <Learn key={i} {...block}/>;
                    case "PageBlocksJobs":
                      return <Jobs key={i} {...block} />;
                    case "PageBlocksSolutions":
                        return <SolutionsGrid key={i} {...block} solutionRes={solutionContent}/>
                    case "PageBlocksTestimonies":
                        return <Testimonies key={i} {...block}/>
                    case "PageBlocksPartners":
                      return <PartnersGrid key={i} partnersRes={partnersContent} {...block}/>
                    case "PageBlocksPriorityPartners":
                      return <PriorityPartners key={i} partnersRes={partnersContent} {...block}/>
                    case "PageBlocksPerformances":
                      return <PerformanceGrid key={i} performanceRes={performanceContent} {...block}/>
                    default:
                    console.warn("Unknown block type:", block?.__typename);
                    return null;
                }
        })}
      <Footer res={footerContent.footer}/>
      

  
   
    </>
  );
}




