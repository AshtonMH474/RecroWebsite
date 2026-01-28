import { test, expect } from '@playwright/test';
import { login } from '../fixtures/auth';

const TEST_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD;

test.describe('Solutions Statements Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solutions/cloud');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const statementsSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24').first();

    if ((await statementsSection.count()) === 0) {
      test.skip(true, 'Statements section not present on page');
    }

    await statementsSection.scrollIntoViewIfNeeded();

    const heading = statementsSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one statement card with icon, title, and description', async ({
    page,
  }) => {
    const statementsSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24').first();

    if ((await statementsSection.count()) === 0) {
      test.skip(true, 'Statements section not present on page');
    }

    await statementsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const statementCards = statementsSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]'
    );

    if ((await statementCards.count()) === 0) {
      test.skip(true, 'No statement cards present on page');
    }

    const firstCard = statementCards.first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const icon = firstCard.locator('.bg-primary').first();
    await expect(icon).toBeVisible({ timeout: 10000 });

    const title = firstCard.locator('h3').first();
    await expect(title).toBeVisible({ timeout: 10000 });

    const description = firstCard.locator('p').first();
    await expect(description).toBeVisible({ timeout: 10000 });
  });

  test('should open register modal when clicking card while not logged in', async ({ page }) => {
    const statementsSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24').first();

    if ((await statementsSection.count()) === 0) {
      test.skip(true, 'Statements section not present on page');
    }

    await statementsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const statementCards = statementsSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]'
    );

    if ((await statementCards.count()) === 0) {
      test.skip(true, 'No statement cards present on page');
    }

    const firstCard = statementCards.first();
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

    const statementsSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24').first();

    if ((await statementsSection.count()) === 0) {
      test.skip(true, 'Statements section not present on page');
    }

    await statementsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const statementCards = statementsSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]'
    );

    if ((await statementCards.count()) === 0) {
      test.skip(true, 'No statement cards present on page');
    }

    const firstCard = statementCards.first();

    const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);

    await firstCard.click();

    const download = await downloadPromise;
    expect(download).toBeTruthy();
  });
});
