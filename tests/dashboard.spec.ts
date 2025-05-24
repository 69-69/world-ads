/*
import {test, expect} from '@playwright/test';

test('load dashboard page for authenticated user', async ({page}) => {
    try {
        // Navigate to the dashboard (assuming the user is already logged in via storageState)
        await page.waitForURL('**!/admin/dashboard**', {waitUntil: 'networkidle'});

        // Assert that the expected dashboard title/text is visible
        await expect(page.getByRole('heading', {name:'iStorezhona'})).toBeVisible();

    } catch (error) {
        console.error('Error during test execution:', error);
        // generate screenshot
        const screenshotPath = `./tests/screenshots/dashboard-error.png`;
        await page.screenshot({path: screenshotPath, fullPage: true});
    }
});
*/
