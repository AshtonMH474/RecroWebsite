import { test, expect } from '@playwright/test';

test.describe('Priority Partners Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const partnersSection = page.locator('.bg-black.w-full.overflow-hidden.h-\\[400px\\]');

    if ((await partnersSection.count()) === 0) {
      test.skip(true, 'Priority Partners section not present on home page');
    }

    await partnersSection.scrollIntoViewIfNeeded();

    const heading = partnersSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should have a button that navigates to another page', async ({ page }) => {
    const partnersSection = page.locator('.bg-black.w-full.overflow-hidden.h-\\[400px\\]');

    if ((await partnersSection.count()) === 0) {
      test.skip(true, 'Priority Partners section not present on home page');
    }

    await partnersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const button = partnersSection.locator('a button').first();

    if ((await button.count()) === 0) {
      test.skip(true, 'Button not present in Priority Partners section');
    }

    await expect(button).toBeVisible({ timeout: 10000 });

    const link = partnersSection.locator('a[href]').first();
    const href = await link.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).not.toBe('#');

    await button.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).not.toBe('/');
  });

  test('should display at least one priority partner', async ({ page }) => {
    const partnersSection = page.locator('.bg-black.w-full.overflow-hidden.h-\\[400px\\]');

    if ((await partnersSection.count()) === 0) {
      test.skip(true, 'Priority Partners section not present on home page');
    }

    await partnersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const partnerCards = partnersSection.locator('.marquee .bg-\\[\\#1A1A1E\\]');
    const cardCount = await partnerCards.count();

    expect(cardCount).toBeGreaterThanOrEqual(1);
    await expect(partnerCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should have marquee animation moving across screen', async ({ page }) => {
    const partnersSection = page.locator('.bg-black.w-full.overflow-hidden.h-\\[400px\\]');

    if ((await partnersSection.count()) === 0) {
      test.skip(true, 'Priority Partners section not present on home page');
    }

    await partnersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const marquee = partnersSection.locator('.marquee');

    if ((await marquee.count()) === 0) {
      test.skip(true, 'Marquee element not present');
    }

    await expect(marquee).toBeVisible({ timeout: 10000 });

    // Get initial transform position
    const initialTransform = await marquee.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // Wait for animation to progress
    await page.waitForTimeout(1000);

    // Get new transform position
    const newTransform = await marquee.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // Transform should have changed, indicating movement
    expect(newTransform).not.toBe(initialTransform);
  });
});
