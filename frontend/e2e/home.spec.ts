import { test, expect } from '@playwright/test'

test('home page renders and links to suits', async ({ page }) => {
  await page.goto('/en')
  await expect(page.getByRole('heading', { level: 1, name: 'Skyderby' })).toBeVisible()

  await page.getByRole('navigation').getByRole('link', { name: 'Suits' }).click()
  await expect(page).toHaveURL(/\/en\/suits/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Suit')
})
