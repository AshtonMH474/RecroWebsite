import { useTina } from "tinacms/dist/react";
import { client } from "../../../tina/__generated__/databaseClient";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";
import SolutionLanding from "@/components/SolutionPage/Landing";
import SolutionCards from "@/components/SolutionPage/Cards";
import Statements from "@/components/SolutionPage/Statements/Statements";
import SolutionPerformances from "@/components/SolutionPage/Performances/Performances";

export async function getStaticPaths() {
  const solutionList = await client.queries.solutionConnection();
  const paths = solutionList.data.solutionConnection.edges.map((edge) => ({
    params: { slug: edge.node._sys.filename },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [solutionRes, navRes, footerRes] = await Promise.all([
    client.queries.solution({ relativePath: `${params.slug}.md` }),
    client.queries.nav({ relativePath: "nav.md" }),
    client.queries.footer({ relativePath: "footer.md" }),
  ]);

  return {
    props: {
      solutionData: solutionRes,
      navData: navRes,
      footerData: footerRes,
    },
  };
}

function SolutionPage({ solutionData, navData, footerData }) {
  const { data: solution } = useTina(solutionData);
  const { data: navContent } = useTina(navData);
  const { data: footerContent } = useTina(footerData);
  
    return (
        <>
            <Nav res={navContent.nav}/>
            <SolutionLanding solution={solution.solution}/>
            {solution.solution.blocks?.map((block,i) => {
                switch(block?.__typename){
                    case "SolutionBlocksCards":
                        return <SolutionCards key={i} {...block}/>
                    case "SolutionBlocksStatements":
                        return <Statements key={i} {...block}/>
                    case "SolutionBlocksPerformances" :
                      return <SolutionPerformances key={i} {...block}/>
                    default:
                        return null
                }
            })}
            <Footer res={footerContent.footer}/>
        </>
    )
}

export default SolutionPage