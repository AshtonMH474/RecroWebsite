import { useTina } from 'tinacms/dist/react';
import { client } from '../../../tina/__generated__/databaseClient';
import { getSharedData } from '@/lib/getSharedData';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer';
import SolutionLanding from '@/components/SolutionPage/Landing';
import SolutionCards from '@/components/SolutionPage/Cards';
import Statements from '@/components/SolutionPage/Statements/Statements';
import SolutionPerformances from '@/components/SolutionPage/Performances/Performances';

// Cache all solution data during build
let cachedSolutions = null;

async function getAllSolutions() {
  if (!cachedSolutions) {
    const solutionList = await client.queries.solutionConnection();
    const slugs = solutionList.data.solutionConnection.edges.map((edge) => edge.node._sys.filename);

    // Fetch all solutions in parallel once
    const allSolutionData = await Promise.all(
      slugs.map((slug) => client.queries.solution({ relativePath: `${slug}.md` }))
    );

    // Build a map for quick lookup
    cachedSolutions = {};
    slugs.forEach((slug, i) => {
      cachedSolutions[slug] = allSolutionData[i];
    });
  }
  return cachedSolutions;
}

export async function getStaticPaths() {
  const solutions = await getAllSolutions();
  const paths = Object.keys(solutions).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Get cached solutions and shared data in parallel
  const [solutions, sharedData] = await Promise.all([getAllSolutions(), getSharedData()]);

  return {
    props: {
      solutionData: solutions[params.slug],
      navData: sharedData.navData,
      footerData: sharedData.footerData,
    },
  };
}

function SolutionPage({ solutionData, navData, footerData }) {
  const { data: solution } = useTina(solutionData);
  const { data: navContent } = useTina(navData);
  const { data: footerContent } = useTina(footerData);

  return (
    <>
      <Nav res={navContent.nav} />
      <SolutionLanding solution={solution.solution} />
      {solution.solution.blocks?.map((block, i) => {
        switch (block?.__typename) {
          case 'SolutionBlocksCards':
            return <SolutionCards key={i} {...block} />;
          case 'SolutionBlocksStatements':
            return <Statements key={i} {...block} />;
          case 'SolutionBlocksPerformances':
            return <SolutionPerformances key={i} {...block} />;
          default:
            return null;
        }
      })}
      <Footer res={footerContent.footer} />
    </>
  );
}

export default SolutionPage;
