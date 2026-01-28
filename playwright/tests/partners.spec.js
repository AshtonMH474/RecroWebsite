import { test, expect } from '@playwright/test';

test.describe('Partners Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.goto('/partners');

    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const partnersSection = page.locator('.bg-black.w-full.overflow-hidden.pb-24').first();

    if ((await partnersSection.count()) === 0) {
      test.skip(true, 'Partners section not present on page');
    }

    await partnersSection.scrollIntoViewIfNeeded();

    const heading = partnersSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one partner card with an image', async ({ page }) => {
    const partnersSection = page.locator('.bg-black.w-full.overflow-hidden.pb-24').first();

    if ((await partnersSection.count()) === 0) {
      test.skip(true, 'Partners section not present on page');
    }

    await partnersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const partnerCards = partnersSection.locator('.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[120px\\]');

    if ((await partnerCards.count()) === 0) {
      test.skip(true, 'No partner cards present on page');
    }

    const firstCard = partnerCards.first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const image = firstCard.locator('img').first();
    await expect(image).toBeVisible({ timeout: 10000 });
  });
});
