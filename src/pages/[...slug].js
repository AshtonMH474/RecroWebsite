import dynamic from 'next/dynamic';
import { useTina } from 'tinacms/dist/react';
import { client } from '../../tina/__generated__/databaseClient';
import {
  getSharedData,
  getCachedSolutionData,
  getCachedPartnerData,
  getCachedPerformanceData,
} from '@/lib/getSharedData';
import useScrollToHash from '@/hooks/useScrollToHash';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer';
import Cards from '@/components/Cards/Cards';
import Jobs from '@/components/Jobs/Jobs';
import Landing from '@/components/Landing';
import Landing2 from '@/components/Landing2';
import Leadership from '@/components/Leadership/Leadership';
import Learn from '@/components/Learn';
import Testimonies from '@/components/Testimonies/Testimonies';
import SolutionsGrid from '@/components/SolutionsGrid/SolutionsGrid';
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

export async function getStaticPaths() {
  const pages = await client.queries.pageConnection();
  const allPaths = pages?.data?.pageConnection?.edges.map(({ node }) => ({
    params: { slug: [node._sys.filename] },
  }));
  return { paths: allPaths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filename = params.slug[0] + '.md';
  const isCareers = params.slug[0] === 'careers';

  // Fetch page data and cached nav/footer in parallel
  const [pageData, sharedData] = await Promise.all([
    client.queries.page({ relativePath: filename }),
    getSharedData({ includeCareersFooter: isCareers }),
  ]);

  // Check what additional data the page actually needs
  const blocks = pageData?.data?.page?.blocks;
  const needs = getRequiredData(blocks);

  // Only fetch the data that's actually needed
  const additionalQueries = [];
  const queryMap = {};

  if (needs.solutions) {
    queryMap.solutions = additionalQueries.length;
    additionalQueries.push(getCachedSolutionData());
  }
  if (needs.partners) {
    queryMap.partners = additionalQueries.length;
    additionalQueries.push(getCachedPartnerData());
  }
  if (needs.performance) {
    queryMap.performance = additionalQueries.length;
    additionalQueries.push(getCachedPerformanceData());
  }

  const additionalResults =
    additionalQueries.length > 0 ? await Promise.all(additionalQueries) : [];

  return {
    props: {
      cmsData: {
        pageData,
        navData: sharedData.navData,
        footerData: isCareers ? sharedData.footerCareersData : sharedData.footerData,
        solutionData: needs.solutions ? additionalResults[queryMap.solutions] : null,
        partnerData: needs.partners ? additionalResults[queryMap.partners] : null,
        performanceData: needs.performance ? additionalResults[queryMap.performance] : null,
      },
    },
  };
}

function useOptionalTina(data) {
  const result = useTina(data || { data: null, query: '', variables: {} });
  return data ? result.data : null;
}

export default function Slug({ cmsData }) {
  const { data: pageContent } = useTina(cmsData.pageData);
  const { data: navContent } = useTina(cmsData.navData);
  const { data: footerContent } = useTina(cmsData.footerData);
  const solutionContent = useOptionalTina(cmsData.solutionData);
  const partnersContent = useOptionalTina(cmsData.partnerData);
  const performanceContent = useOptionalTina(cmsData.performanceData);

  useScrollToHash(pageContent.page.blocks, [
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
      {pageContent.page.blocks?.map((block, i) => {
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
