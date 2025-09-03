import dynamic from "next/dynamic";
import { useTina } from "tinacms/dist/react";
import useScrollToHash from "@/hooks/useScrollToHash";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";
import Cards from "@/components/Cards/Cards";
import Jobs from "@/components/Jobs/Jobs";
import Landing from "@/components/Landing";
import Landing2 from "@/components/Landing2";
import Leadership from "@/components/Leadership/Leadership";
import Learn from "@/components/Learn";
import Testimonies from "@/components/Testimonies/Testimonies";
import SolutionsGrid from "@/components/SolutionsGrid/SolutionsGrid";
import PartnersGrid from "@/components/Partners/PartnersGrid";
const PriorityPartners = dynamic(() => import("@/components/Partners/PriorityPartners/PriorityPartners"), { ssr: true });
const PerformanceGrid = dynamic(() => import("@/components/PerformanceGrid/PerformanceGrid"), { ssr: true });

export async function getStaticPaths() {
  const { client } = await import("../../tina/__generated__/databaseClient");
  const pages = await client.queries.pageConnection();
  const paths = pages.data.pageConnection.edges.map(({ node }) => ({
    params: { slug: [node._sys.filename] },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { client } = await import("../../tina/__generated__/databaseClient");
  const filename = params.slug[0] + ".md";
  const isCareers = filename === "careers.md";

  const [pageData, navData, footerData, solutionData, partnerData, performanceData] = await Promise.all([
    client.queries.page({ relativePath: filename }),
    client.queries.nav({ relativePath: "nav.md" }),
    client.queries.footer({ relativePath: isCareers ? "footerCareers.md" : "footer.md" }),
    client.queries.solutionConnection(),
    client.queries.partnerConnection({ first: 100 }),
    client.queries.performanceConnection(),
  ]);

  return {
    props: {
      cmsData: {
        pageData,
        navData,
        footerData,
        solutionData,
        partnerData,
        performanceData,
      },
    },
  };
}

export default function Slug({ cmsData }) {
  // Combine all useTina calls into one
  const { data: pageContent } = useTina(cmsData.pageData);
  const { data: navContent } = useTina(cmsData.navData);
  const { data: footerContent } = useTina(cmsData.footerData);
  const { data: solutionContent } = useTina(cmsData.solutionData);
  const { data: partnersContent } = useTina(cmsData.partnerData);
  const { data: performanceContent } = useTina(cmsData.performanceData);

  useScrollToHash(pageContent.page.blocks, [
    "cards_id",
    "jobs_id",
    "leadership_id",
    "learn_id",
    "landing_id",
    "landing2_id",
    "testimonies_id",
    "solutions_id",
    "partners_id",
    "performance_id",
  ]);

  return (
    <>
      <Nav res={navContent.nav} />
      {pageContent.page.blocks?.map((block, i) => {
        switch (block?.__typename) {
          case "PageBlocksLanding":
            return <Landing key={i} {...block} />;
          case "PageBlocksLanding2":
            return <Landing2 key={i} {...block} />;
          case "PageBlocksCards":
            return <Cards key={i} {...block} />;
          case "PageBlocksLeadership":
            return <Leadership key={i} {...block} />;
          case "PageBlocksLearnTeam":
            return <Learn key={i} {...block} />;
          case "PageBlocksJobs":
            return <Jobs key={i} {...block} />;
          case "PageBlocksSolutions":
            return <SolutionsGrid key={i} {...block} solutionRes={solutionContent} />;
          case "PageBlocksTestimonies":
            return <Testimonies key={i} {...block} />;
          case "PageBlocksPartners":
            return <PartnersGrid key={i} partnersRes={partnersContent} {...block} />;
          case "PageBlocksPriorityPartners":
            return <PriorityPartners key={i} partnersRes={partnersContent} {...block} />;
          case "PageBlocksPerformances":
            return <PerformanceGrid key={i} performanceRes={performanceContent} {...block} />;
          default:
            console.warn("Unknown block type:", block?.__typename);
            return null;
        }
      })}
      <Footer res={footerContent.footer} />
    </>
  );
}
