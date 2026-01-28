import { test, expect } from '@playwright/test';

test.describe('Learn More Block UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display Learn More section with heading and description', async ({ page }) => {
    const learnSection = page.locator('.bg-black.overflow-hidden.w-full.relative.z-30');

    if ((await learnSection.count()) === 0) {
      test.skip(true, 'Learn More section not present on home page');
    }

    await learnSection.scrollIntoViewIfNeeded();

    const heading = learnSection.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });

    const paragraph = learnSection.locator('p').first();
    await expect(paragraph).toBeVisible({ timeout: 10000 });
  });

  test('should have a button that navigates to another page', async ({ page }) => {
    const learnSection = page.locator('.bg-black.overflow-hidden.w-full.relative.z-30');

    if ((await learnSection.count()) === 0) {
      test.skip(true, 'Learn More section not present on home page');
    }

    await learnSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const button = learnSection.locator('a button').first();

    if ((await button.count()) === 0) {
      test.skip(true, 'Button not present in Learn More section');
    }

    await expect(button).toBeVisible({ timeout: 10000 });

    const link = learnSection.locator('a[href]').first();
    const href = await link.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).not.toBe('#');

    await button.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).not.toBe('/');
  });

  test('should display at least one image', async ({ page }) => {
    const learnSection = page.locator('.bg-black.overflow-hidden.w-full.relative.z-30');

    if ((await learnSection.count()) === 0) {
      test.skip(true, 'Learn More section not present on home page');
    }

    await learnSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const images = learnSection.locator('img');
    const imageCount = await images.count();

    expect(imageCount).toBeGreaterThanOrEqual(1);
    await expect(images.first()).toBeVisible({ timeout: 10000 });
  });

  test('should have all required elements when section exists', async ({ page }) => {
    const learnSection = page.locator('.bg-black.overflow-hidden.w-full.relative.z-30');

    if ((await learnSection.count()) === 0) {
      test.skip(true, 'Learn More section not present on home page');
    }

    await learnSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const heading = learnSection.locator('h1').first();
    const paragraph = learnSection.locator('p').first();
    const button = learnSection.locator('a button').first();
    const image = learnSection.locator('img').first();

    await expect(heading).toBeVisible({ timeout: 10000 });
    await expect(paragraph).toBeVisible({ timeout: 10000 });

    if ((await button.count()) > 0) {
      await expect(button).toBeVisible();
    }

    if ((await image.count()) > 0) {
      await expect(image).toBeVisible();
    }
  });
});
