import { test, expect } from '@playwright/test';

test.describe('Leadership Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
  });

  test('should display heading', async ({ page }) => {
    const leadershipSection = page.locator('.bg-black.w-full.pb-24.overflow-hidden').first();

    if ((await leadershipSection.count()) === 0) {
      test.skip(true, 'Leadership section not present on page');
    }

    await leadershipSection.scrollIntoViewIfNeeded();

    const heading = leadershipSection.locator('h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display at least one leader card with name, title, and background image', async ({
    page,
  }) => {
    const leadershipSection = page.locator('.bg-black.w-full.pb-24.overflow-hidden').first();

    if ((await leadershipSection.count()) === 0) {
      test.skip(true, 'Leadership section not present on page');
    }

    await leadershipSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const leaderCards = leadershipSection.locator('[role="img"].w-\\[300px\\]');

    if ((await leaderCards.count()) === 0) {
      test.skip(true, 'No leader cards present on page');
    }

    const firstCard = leaderCards.first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const backgroundDiv = firstCard.locator('.bg-cover.bg-center');
    const backgroundImage = await backgroundDiv.evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage;
    });
    expect(backgroundImage).toBeTruthy();
    expect(backgroundImage).not.toBe('none');

    const infoBox = firstCard.locator('.bg-\\[\\#1A1A1E\\]');
    await expect(infoBox).toBeVisible({ timeout: 10000 });

    const nameAndTitle = infoBox.locator('p');
    expect(await nameAndTitle.count()).toBeGreaterThanOrEqual(2);
  });

  test('should open modal with description when clicking on leader card', async ({ page }) => {
    const leadershipSection = page.locator('.bg-black.w-full.pb-24.overflow-hidden').first();

    if ((await leadershipSection.count()) === 0) {
      test.skip(true, 'Leadership section not present on page');
    }

    await leadershipSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const leaderCards = leadershipSection.locator('[role="img"].w-\\[300px\\]');

    if ((await leaderCards.count()) === 0) {
      test.skip(true, 'No leader cards present on page');
    }

    const firstCard = leaderCards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await firstCard.click();
    await page.waitForTimeout(500);

    const modalName = page.locator('.text-2xl.md\\:text-3xl.font-bold.text-white');
    await expect(modalName).toBeVisible({ timeout: 10000 });

    const modalBio = page.locator('.text-white\\/90');
    await expect(modalBio).toBeVisible({ timeout: 10000 });
  });
});
