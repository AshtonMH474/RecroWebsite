import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer";
import Jobs from "@/components/Jobs/Jobs";
import Landing from "@/components/Landing";
import Landing2 from "@/components/Landing2";
import Leadership from "@/components/Leadership/Leadership";
import Learn from "@/components/Learn";
import Nav from "@/components/Nav/Nav";
import PartnersGrid from "@/components/Partners/PartnersGrid";
import SolutionsGrid from "@/components/SolutionsGrid/SolutionsGrid";
import Testimonies from "@/components/Testimonies/Testimonies";
import useScrollToHash from "@/hooks/useScrollToHash";
import { useTina } from "tinacms/dist/react";

export async function getStaticPaths() {
  const { client } = await import("../../tina/__generated__/databaseClient");

  // Fetch all pages
  const pages = await client.queries.pageConnection();

  const paths = pages.data.pageConnection.edges.map(({ node }) => ({
    params: { slug: [node._sys.filename] }, // ["expertise"]
  }));

  return {
    paths,
    fallback: false, // show 404 for pages not in CMS
  };
}

export async function getStaticProps({ params }) {
  const { client } = await import("../../tina/__generated__/databaseClient");

  // For single slug, params.slug = ["expertise"]
  const filename = params.slug[0] + ".md";
  const isTrue = filename == "careers.md"
  const [pageData, navData, footerData, solutionData,partnerData] = await Promise.all([
    client.queries.page({ relativePath: filename }),
    client.queries.nav({ relativePath: "nav.md" }),
    isTrue ? client.queries.footer({ relativePath: "footerCareers.md" }) : client.queries.footer({ relativePath: "footer.md" }) ,
    client.queries.solutionConnection(),
    client.queries.partnerConnection({first:100})
  ]);

return {
  props: {
    res: pageData,
    navData,
    footerData,
    solutionData,
    partnerData, // array of pages with edges/node
  },
  };
}

export default function Slug({ res,navData,footerData,solutionData,partnerData }) {
  const {data} = useTina(res)
  const {data:navContent} = useTina(navData)
  const {data:footerContent} = useTina(footerData)
  const { data: partnersContent } = useTina(partnerData);
  const { data: solutionContent } = useTina(solutionData);
  
  
    useScrollToHash(data.page.blocks, [
            'cards_id',
            'jobs_id',
            'leadership_id',
            'learn_id',
            'landing_id',
            'landing2_id',
            'testimonies_id',
            'solutions_id',
            "partners_id"

  
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
                    default:
                    console.warn("Unknown block type:", block?.__typename);
                    return null;
                }
        })}
      <Footer res={footerContent.footer}/>
      

  
   
    </>
  );
}