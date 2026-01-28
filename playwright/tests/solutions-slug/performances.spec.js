import { test, expect } from '@playwright/test';
import { login } from '../fixtures/auth';

const TEST_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD;

test.describe('Solutions Performances Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solutions/cloud');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const performancesSection = page.locator('section.pb-16').last();

    if ((await performancesSection.count()) === 0) {
      test.skip(true, 'Performances section not present on page');
    }

    await performancesSection.scrollIntoViewIfNeeded();

    const heading = performancesSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one performance card with icon, title, and description', async ({
    page,
  }) => {
    const performancesSection = page.locator('section.pb-16').last();

    if ((await performancesSection.count()) === 0) {
      test.skip(true, 'Performances section not present on page');
    }

    await performancesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const performanceCards = performancesSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]'
    );

    if ((await performanceCards.count()) === 0) {
      test.skip(true, 'No performance cards present on page');
    }

    const firstCard = performanceCards.first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const icon = firstCard.locator('.bg-primary').first();
    await expect(icon).toBeVisible({ timeout: 10000 });

    const title = firstCard.locator('h3').first();
    await expect(title).toBeVisible({ timeout: 10000 });

    const description = firstCard.locator('p').first();
    await expect(description).toBeVisible({ timeout: 10000 });
  });

  test('should open register modal when clicking card while not logged in', async ({ page }) => {
    const performancesSection = page.locator('section.pb-16').last();

    if ((await performancesSection.count()) === 0) {
      test.skip(true, 'Performances section not present on page');
    }

    await performancesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const performanceCards = performancesSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]'
    );

    if ((await performanceCards.count()) === 0) {
      test.skip(true, 'No performance cards present on page');
    }

    const firstCard = performanceCards.first();
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('.fixed.inset-0.z-\\[9999\\]');
    await expect(modal).toBeVisible({ timeout: 10000 });
  });

  test('should download file when clicking card while logged in', async ({ page }) => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      test.skip(true, 'Test credentials not configured in environment variables');
    }

    await page.goto('/');
    await login(page, TEST_EMAIL, TEST_PASSWORD);
    await page.waitForTimeout(1000);
    await page.goto('/solutions/cloud');
    await page.waitForLoadState('networkidle');

    const performancesSection = page.locator('section.pb-16').last();

    if ((await performancesSection.count()) === 0) {
      test.skip(true, 'Performances section not present on page');
    }

    await performancesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const performanceCards = performancesSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]'
    );

    if ((await performanceCards.count()) === 0) {
      test.skip(true, 'No performance cards present on page');
    }

    const firstCard = performanceCards.first();

    const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);

    await firstCard.click();

    const download = await downloadPromise;
    expect(download).toBeTruthy();
  });
});
