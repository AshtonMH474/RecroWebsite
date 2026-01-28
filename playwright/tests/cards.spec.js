import { test, expect } from '@playwright/test';

test.describe('Cards Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const heading = page.locator('h2.heading-animate').first();

    if ((await heading.count()) === 0) {
      test.skip(true, 'Cards section not present on page');
    }

    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one card with icon, title, and description', async ({ page }) => {
    const cards = page.locator('.card');

    if ((await cards.count()) === 0) {
      test.skip(true, 'No cards present on page');
    }

    const firstCard = cards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(firstCard).toBeVisible({ timeout: 10000 });

    // Check for icon
    const icon = firstCard.locator('.bg-primary').first();
    await expect(icon).toBeVisible({ timeout: 10000 });

    // Check for title (h3)
    const title = firstCard.locator('h3').first();
    await expect(title).toBeVisible({ timeout: 10000 });

    // Check for description (p)
    const description = firstCard.locator('p').first();
    await expect(description).toBeVisible({ timeout: 10000 });
  });

  test('should animate cards when scrolled into view', async ({ page }) => {
    const cards = page.locator('.card');

    if ((await cards.count()) === 0) {
      test.skip(true, 'No cards present on page');
    }

    const firstCard = cards.first();

    // Scroll card into view to trigger animation
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // After scrolling, card should have visible class
    const hasVisibleAfterScroll = await firstCard.evaluate((el) => {
      return el.classList.contains('visible');
    });

    expect(hasVisibleAfterScroll).toBe(true);
  });

  test('should animate heading when scrolled into view', async ({ page }) => {
    const heading = page.locator('h2.heading-animate').first();

    if ((await heading.count()) === 0) {
      test.skip(true, 'Heading not present on page');
    }

    // Scroll heading into view
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // After scrolling, heading should have visible class
    const hasVisible = await heading.evaluate((el) => {
      return el.classList.contains('visible');
    });

    expect(hasVisible).toBe(true);
  });
});
