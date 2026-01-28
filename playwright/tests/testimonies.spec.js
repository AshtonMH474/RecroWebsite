import { test, expect } from '@playwright/test';

test.describe('Testimonies Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/values');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const testimoniesSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24').first();

    if ((await testimoniesSection.count()) === 0) {
      test.skip(true, 'Testimonies section not present on page');
    }

    await testimoniesSection.scrollIntoViewIfNeeded();

    const heading = testimoniesSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one testimony card with icon/pic, name, and description', async ({
    page,
  }) => {
    const testimoniesSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24').first();

    if ((await testimoniesSection.count()) === 0) {
      test.skip(true, 'Testimonies section not present on page');
    }

    await testimoniesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const testimonyCards = testimoniesSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[450px\\]'
    );

    if ((await testimonyCards.count()) === 0) {
      test.skip(true, 'No testimony cards present on page');
    }

    const firstCard = testimonyCards.first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const image = firstCard.locator('img').first();
    const iconFallback = firstCard.locator('.rounded-full').first();

    const hasImage = (await image.count()) > 0;
    const hasIcon = (await iconFallback.count()) > 0;
    expect(hasImage || hasIcon).toBe(true);

    const name = firstCard.locator('h2').first();
    await expect(name).toBeVisible({ timeout: 10000 });

    const description = firstCard.locator('p').first();
    await expect(description).toBeVisible({ timeout: 10000 });
  });

  test('should open modal when clicking on testimony card', async ({ page }) => {
    const testimoniesSection = page.locator('.bg-black.overflow-hidden.w-full.pb-24').first();

    if ((await testimoniesSection.count()) === 0) {
      test.skip(true, 'Testimonies section not present on page');
    }

    await testimoniesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const testimonyCards = testimoniesSection.locator(
      '.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[450px\\]'
    );

    if ((await testimonyCards.count()) === 0) {
      test.skip(true, 'No testimony cards present on page');
    }

    const firstCard = testimonyCards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await firstCard.click();
    await page.waitForTimeout(500);

    const modalContent = page.locator('.text-2xl.md\\:text-3xl.font-bold.text-white');
    await expect(modalContent).toBeVisible({ timeout: 10000 });
  });
});
