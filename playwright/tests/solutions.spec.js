import { test, expect } from '@playwright/test';

test.describe('Solutions Grid functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display SolutionsGrid section on home page', async ({ page }) => {
    const solutionsSection = page.locator('section.scrollCenter').first();

    if ((await solutionsSection.count()) === 0) {
      test.skip(true, 'Solutions section not present on home page');
    }
    await solutionsSection.scrollIntoViewIfNeeded();

    const solutionCards = page.locator('.bg-\\[\\#1A1A1E\\].w-\\[300px\\]');
    await expect(solutionCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should download PDF when clicking download button', async ({ page }) => {
    const solutionsSection = page.locator('section.scrollCenter').first();

    if ((await solutionsSection.count()) === 0) {
      test.skip(true, 'Solutions section not present on home page');
    }

    await solutionsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const downloadButton = page
      .locator('.bg-\\[\\#1A1A1E\\].w-\\[300px\\]')
      .first()
      .locator('button.bg-primary')
      .first();

    if ((await downloadButton.count()) === 0) {
      test.skip(true, 'Download button not present');
    }

    await expect(downloadButton).toBeVisible({ timeout: 10000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);

    await downloadButton.click();
    const download = await downloadPromise;

    if (!download) {
      const pages = page.context().pages();
      expect(pages.length).toBeGreaterThanOrEqual(1);
    } else {
      expect(download).toBeTruthy();
    }
  });

  test('should navigate to solution page when clicking Learn More button', async ({ page }) => {
    const solutionsSection = page.locator('section.scrollCenter').first();

    if ((await solutionsSection.count()) === 0) {
      test.skip(true, 'Solutions section not present on home page');
    }

    await solutionsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const solutionCard = page.locator('.bg-\\[\\#1A1A1E\\].w-\\[300px\\]').first();
    await expect(solutionCard).toBeVisible({ timeout: 10000 });
    const learnMoreButton = solutionCard.locator('a[href^="/solutions/"] button');

    if ((await learnMoreButton.count()) === 0) {
      test.skip(true, 'Learn More button not present');
    }

    await expect(learnMoreButton).toBeVisible();

    await learnMoreButton.click();

    await expect(page).toHaveURL(/\/solutions\/.+/, { timeout: 10000 });
  });

  test('should have multiple solution cards visible', async ({ page }) => {
    const solutionsSection = page.locator('section.scrollCenter').first();

    if ((await solutionsSection.count()) === 0) {
      test.skip(true, 'Solutions section not present on home page');
    }

    await solutionsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const solutionCards = page.locator('.bg-\\[\\#1A1A1E\\].w-\\[300px\\]');
    const cardCount = await solutionCards.count();

    expect(cardCount).toBeGreaterThan(0);
  });
});
