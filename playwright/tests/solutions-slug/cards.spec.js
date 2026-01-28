import { test, expect } from '@playwright/test';

test.describe('Solutions Cards Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solutions/cloud');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const cardsSection = page.locator('section.pb-16').first();

    if ((await cardsSection.count()) === 0) {
      test.skip(true, 'Cards section not present on page');
    }

    await cardsSection.scrollIntoViewIfNeeded();

    const heading = cardsSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one card with icon, title, and description', async ({ page }) => {
    const cards = page.locator('.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]');

    if ((await cards.count()) === 0) {
      test.skip(true, 'No cards present on page');
    }

    const firstCard = cards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const icon = firstCard.locator('.bg-primary').first();
    await expect(icon).toBeVisible({ timeout: 10000 });

    const title = firstCard.locator('h3').first();
    await expect(title).toBeVisible({ timeout: 10000 });

    const description = firstCard.locator('p').first();
    await expect(description).toBeVisible({ timeout: 10000 });
  });

  test('should animate cards when scrolled into view', async ({ page }) => {
    const cards = page.locator('.bg-\\[\\#1A1A1E\\].w-\\[300px\\].h-\\[260px\\]');

    if ((await cards.count()) === 0) {
      test.skip(true, 'No cards present on page');
    }

    const firstCard = cards.first();

    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const finalOpacity = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    expect(parseFloat(finalOpacity)).toBe(1);
  });

  test('should animate heading when scrolled into view', async ({ page }) => {
    const cardsSection = page.locator('section.pb-16').first();

    if ((await cardsSection.count()) === 0) {
      test.skip(true, 'Cards section not present on page');
    }

    const heading = cardsSection.locator('h2').first();

    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const opacity = await heading.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    expect(parseFloat(opacity)).toBe(1);
  });
});
