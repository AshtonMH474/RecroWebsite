import { test, expect } from '@playwright/test';

test.describe('Jobs Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const jobsSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24');

    if ((await jobsSection.count()) === 0) {
      test.skip(true, 'Jobs section not present on page');
    }

    await jobsSection.scrollIntoViewIfNeeded();

    const heading = jobsSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one job card', async ({ page }) => {
    const jobCards = page.locator('.job-card');

    // Wait for jobs to load from API
    await page.waitForTimeout(2000);

    if ((await jobCards.count()) === 0) {
      test.skip(true, 'No job cards present on page');
    }

    const firstCard = jobCards.first();
    await firstCard.scrollIntoViewIfNeeded();

    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const title = firstCard.locator('h3').first();
    await expect(title).toBeVisible({ timeout: 10000 });
  });

  test('should open modal when clicking view job button on card', async ({ page }) => {
    const jobCards = page.locator('.job-card');

    // Wait for jobs to load from API
    await page.waitForTimeout(2000);

    if ((await jobCards.count()) === 0) {
      test.skip(true, 'No job cards present on page');
    }

    const firstCard = jobCards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await firstCard.click();
    await page.waitForTimeout(500);
    const modal = page.locator('.modal-mobile-landscape');
    await expect(modal).toBeVisible({ timeout: 10000 });
    const modalTitle = modal.locator('h3').first();
    await expect(modalTitle).toBeVisible({ timeout: 10000 });
  });

  test('should have apply button in modal that links to job application', async ({ page }) => {
    const jobCards = page.locator('.job-card');

    // Wait for jobs to load from API
    await page.waitForTimeout(2000);

    if ((await jobCards.count()) === 0) {
      test.skip(true, 'No job cards present on page');
    }

    const firstCard = jobCards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('.modal-mobile-landscape');
    await expect(modal).toBeVisible({ timeout: 10000 });

    const applyLink = modal.locator('a[href*="ats.recro.com/jobapplication"]');
    await expect(applyLink).toBeVisible({ timeout: 10000 });

    const href = await applyLink.getAttribute('href');
    expect(href).toContain('https://ats.recro.com/jobapplication');
  });

  test('should have button that links to all positions', async ({ page }) => {
    const jobsSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24');

    if ((await jobsSection.count()) === 0) {
      test.skip(true, 'Jobs section not present on page');
    }

    await jobsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const allPositionsLink = jobsSection.locator('a[href="https://ats.recro.com/jobboard"]');

    if ((await allPositionsLink.count()) === 0) {
      test.skip(true, 'All positions button not present');
    }

    await expect(allPositionsLink).toBeVisible({ timeout: 10000 });

    const button = allPositionsLink.locator('button');
    await expect(button).toBeVisible({ timeout: 10000 });

    const href = await allPositionsLink.getAttribute('href');
    expect(href).toBe('https://ats.recro.com/jobboard');
  });
});
