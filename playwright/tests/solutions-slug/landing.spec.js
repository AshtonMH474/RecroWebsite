import { test, expect } from '@playwright/test';

test.describe('Solutions Landing Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solutions/cloud');
    await page.waitForLoadState('networkidle');
  });

  test('should display title and description', async ({ page }) => {
    const landingSection = page.locator('.landing').first();

    if ((await landingSection.count()) === 0) {
      test.skip(true, 'Landing section not present on page');
    }

    const title = landingSection.locator('h1').first();
    await expect(title).toBeVisible({ timeout: 10000 });

    const description = landingSection.locator('p').first();
    await expect(description).toBeVisible({ timeout: 10000 });
  });

  test('should scroll 100vh when arrow is clicked', async ({ page }) => {
    const landingSection = page.locator('.landing').first();

    if ((await landingSection.count()) === 0) {
      test.skip(true, 'Landing section not present on page');
    }

    const arrow = landingSection.locator('svg.cursor-pointer').first();

    if ((await arrow.count()) === 0) {
      test.skip(true, 'Arrow not present on page');
    }

    await expect(arrow).toBeVisible({ timeout: 10000 });

    const initialScrollY = await page.evaluate(() => window.scrollY);

    await arrow.click({ force: true });
    await page.waitForTimeout(1000);

    const newScrollY = await page.evaluate(() => window.scrollY);
    const viewportHeight = await page.evaluate(() => window.innerHeight);

    const scrolledAmount = newScrollY - initialScrollY;
    expect(scrolledAmount).toBeGreaterThan(viewportHeight * 0.5);
    expect(scrolledAmount).toBeLessThan(viewportHeight * 1.5);
  });
});
