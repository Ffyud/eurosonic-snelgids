import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('eurosonic-snelgids');

  await expect(page.locator('header')).toContainText(/eurosonic2026snelgidsvan de Lijstjesman!/);

});

// test('Als gebruiker kan ik een timetable zien', async ({ page }) => {
//   await expect(page.locator('app-select-day')).toContainText('Woensdag 15 januari')
//   await expect(page.locator('.event-list')).toHaveCount(6);
//   await expect(page.locator('.event-list-container')).toHaveText(/Oosterpoort/)
// });

// test('Als gebruiker kan ik een andere festivaldag kiezen', async ({page}) => {
//   await expect(page.locator('app-select-day')).toContainText('Woensdag 15 januari')
//   await page.locator('app-select-day').locator('.forward').click();
//   await expect(page.locator('app-select-day')).toContainText('Donderdag 16 januari')
//   await expect(page.locator('.event-list')).toHaveCount(20);
// });

test('Als gebruiker kan ik informatie lezen', async ({page}) => {
  await page.locator('app-tap-bar-nav').getByText('info').click();
  await expect(page.locator('app-page-info')).toHaveText(/Deze website/);
  await expect(page.locator('ul.links')).toBeVisible();
});

test('Als gebruiker wil ik favorieten bijhouden', async ({page}) => {
  await page.locator('app-tap-bar-nav').getByText('favorieten').click();
  await expect(page.locator('app-page-favorites')).toHaveText(/Nog geen favorieten gekozen./);
  await page.locator('app-tap-bar-nav').getByText('schema').click();

  await page.locator('.event-card').nth(4).getByRole('button').click();
  await page.locator('app-tap-bar-nav').getByText('favorieten').click();
  await expect(page.locator('app-page-favorites').locator('.event-card')).toHaveCount(1);
});

