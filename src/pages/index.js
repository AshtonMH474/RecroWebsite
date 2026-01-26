import dynamic from 'next/dynamic';
import Landing from '../components/Landing';
import { useTina } from 'tinacms/dist/react';
import Learn from '@/components/Learn';
import Footer from '@/components/Footer';
import Cards from '../components/Cards/Cards';
import Leadership from '@/components/Leadership/Leadership';
import Jobs from '@/components/Jobs/Jobs';
import Nav from '@/components/Nav/Nav';
import useScrollToHash from '@/hooks/useScrollToHash';
import SolutionsGrid from '@/components/SolutionsGrid/SolutionsGrid';
import Landing2 from '@/components/Landing2';
import Testimonies from '@/components/Testimonies/Testimonies';
import PartnersGrid from '@/components/Partners/PartnersGrid';
const PriorityPartners = dynamic(
  () => import('@/components/Partners/PriorityPartners/PriorityPartners'),
  { ssr: true }
);
const PerformanceGrid = dynamic(() => import('@/components/PerformanceGrid/PerformanceGrid'), {
  ssr: true,
});

function getRequiredData(blocks) {
  const needs = {
    solutions: false,
    partners: false,
    performance: false,
  };

  blocks?.forEach((block) => {
    switch (block?.__typename) {
      case 'PageBlocksSolutions':
        needs.solutions = true;
        break;
      case 'PageBlocksPartners':
      case 'PageBlocksPriorityPartners':
        needs.partners = true;
        break;
      case 'PageBlocksPerformances':
        needs.performance = true;
        break;
    }
  });

  return needs;
}

export async function getStaticProps() {
  const { client } = await import('../../tina/__generated__/databaseClient');

  const pageData = await client.queries.page({ relativePath: 'home.md' });
  const blocks = pageData?.data?.page?.blocks;
  const needs = getRequiredData(blocks);

  const queries = [
    client.queries.nav({ relativePath: 'nav.md' }),
    client.queries.footer({ relativePath: 'footer.md' }),
  ];

  if (needs.solutions) {
    queries.push(client.queries.solutionConnection());
  }
  if (needs.partners) {
    queries.push(client.queries.partnerConnection({ first: 100 }));
  }
  if (needs.performance) {
    queries.push(client.queries.performanceConnection());
  }

  const results = await Promise.all(queries);

  let idx = 0;
  const navData = results[idx++];
  const footerData = results[idx++];
  const solutionData = needs.solutions ? results[idx++] : null;
  const partnerData = needs.partners ? results[idx++] : null;
  const performanceData = needs.performance ? results[idx++] : null;

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

function useOptionalTina(data) {
  const result = useTina(data || { data: null, query: '', variables: {} });
  return data ? result.data : null;
}

export default function Home({ cmsData }) {
  const { data } = useTina(cmsData.pageData);
  const { data: navContent } = useTina(cmsData.navData);
  const { data: footerContent } = useTina(cmsData.footerData);
  const solutionContent = useOptionalTina(cmsData.solutionData);
  const partnersContent = useOptionalTina(cmsData.partnerData);
  const performanceContent = useOptionalTina(cmsData.performanceData);

  useScrollToHash(data.page.blocks, [
    'cards_id',
    'jobs_id',
    'leadership_id',
    'learn_id',
    'landing_id',
    'landing2_id',
    'testimonies_id',
    'solutions_id',
    'partners_id',
    'performance_id',
  ]);

  return (
    <>
      <Nav res={navContent.nav} />
      {data.page.blocks?.map((block, i) => {
        switch (block?.__typename) {
          case 'PageBlocksLanding':
            return <Landing key={i} {...block} />;
          case 'PageBlocksLanding2':
            return <Landing2 key={i} {...block} />;
          case 'PageBlocksCards':
            return <Cards key={i} {...block} />;
          case 'PageBlocksLeadership':
            return <Leadership key={i} {...block} />;
          case 'PageBlocksLearnTeam':
            return <Learn key={i} {...block} />;
          case 'PageBlocksJobs':
            return <Jobs key={i} {...block} />;
          case 'PageBlocksSolutions':
            return solutionContent ? (
              <SolutionsGrid key={i} {...block} solutionRes={solutionContent} />
            ) : null;
          case 'PageBlocksTestimonies':
            return <Testimonies key={i} {...block} />;
          case 'PageBlocksPartners':
            return partnersContent ? (
              <PartnersGrid key={i} partnersRes={partnersContent} {...block} />
            ) : null;
          case 'PageBlocksPriorityPartners':
            return partnersContent ? (
              <PriorityPartners key={i} partnersRes={partnersContent} {...block} />
            ) : null;
          case 'PageBlocksPerformances':
            return performanceContent ? (
              <PerformanceGrid key={i} performanceRes={performanceContent} {...block} />
            ) : null;
          default:
            console.warn('Unknown block type:', block?.__typename);
            return null;
        }
      })}
      <Footer res={footerContent.footer} />
    </>
  );
}
