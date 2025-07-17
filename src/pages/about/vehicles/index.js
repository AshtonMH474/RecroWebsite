import Nav from "@/components/Nav/Nav";
import { useTina } from "tinacms/dist/react";
import Footer from "@/components/Footer";
import Leadership from "@/components/Leadership/Leadership";
import Landing from "@/components/Landing";
import Cards from "@/components/Cards/Cards";
import Learn from "@/components/Learn";
import Jobs from "@/components/Jobs/Jobs";
import useScrollToHash from "@/hooks/useScrollToHash";
import SolutionsGrid from "@/components/SolutionsGrid/SolutionsGrid";
import Landing2 from "@/components/Landing2";



export async function getStaticProps() {
  const { client } = await import("../../../../tina/__generated__/databaseClient");

  // Run TinaCMS queries in parallel
  const [pageData, navData, footerData, solutionData, jobRes] = await Promise.all([
    client.queries.page({ relativePath: "vehicles.md" }),
    client.queries.nav({ relativePath: "nav.md" }),
    client.queries.footer({ relativePath: "footer.md" }),
    client.queries.solutionConnection(),
    fetch("https://ats.recro.com/api/joblistings"),
  ]);

  const jobs = await jobRes.json();

  const solutions = solutionData.data.solutionConnection.edges.map(({ node }) => node);

  return {
    props: {
      res: pageData,
      navData,
      footerData,
      jobs,
      solutions,
    },
  };
}


function Vehicles({res,navData,footerData,jobs,solutions}){
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
                      return <Jobs key={i} jobs={jobs} {...block}/>;
                    case "PageBlocksSolutions":
                        return <SolutionsGrid key={i} {...block} solutions={solutions}/>
                    default:
                    console.warn("Unknown block type:", block?.__typename);
                    return null;
                }
                })}

            
            
            <Footer res={footerContent.footer}/>
        </>
    )
}

export default Vehicles