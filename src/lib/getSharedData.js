import { client } from '../../tina/__generated__/databaseClient';

// Cache shared data during build to avoid repeated fetches
let cachedNavData = null;
let cachedFooterData = null;
let cachedFooterCareersData = null;
let cachedSolutionData = null;
let cachedPartnerData = null;
let cachedPerformanceData = null;

export async function getSharedData(options = {}) {
  const { includeCareersFooter = false } = options;

  if (!cachedNavData) {
    cachedNavData = await client.queries.nav({ relativePath: 'nav.md' });
  }

  if (!cachedFooterData) {
    cachedFooterData = await client.queries.footer({ relativePath: 'footer.md' });
  }

  if (includeCareersFooter && !cachedFooterCareersData) {
    cachedFooterCareersData = await client.queries.footer({ relativePath: 'footerCareers.md' });
  }

  return {
    navData: cachedNavData,
    footerData: cachedFooterData,
    footerCareersData: cachedFooterCareersData,
  };
}

// Cache connection data that's shared across multiple pages
export async function getCachedSolutionData() {
  if (!cachedSolutionData) {
    cachedSolutionData = await client.queries.solutionConnection();
  }
  return cachedSolutionData;
}

export async function getCachedPartnerData() {
  if (!cachedPartnerData) {
    cachedPartnerData = await client.queries.partnerConnection({ first: 100 });
  }
  return cachedPartnerData;
}

export async function getCachedPerformanceData() {
  if (!cachedPerformanceData) {
    cachedPerformanceData = await client.queries.performanceConnection();
  }
  return cachedPerformanceData;
}
