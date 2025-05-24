/*
import {expect, test} from "@playwright/test";

// Manual login test, if you don't want to use th GLOBAL-SETUP
test('user can log in and see dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Assert redirection and session established
    await expect(page).toHaveURL('/admin/dashboard');
    await expect(page.getByText('iStorezhona')).toBeVisible();
});
*/
