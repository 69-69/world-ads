import {chromium, FullConfig} from '@playwright/test';
import fs from 'fs';
import path from 'path';

// This global setup script is used to perform authentication before running tests.
async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext(); // New isolated browser context
    const page = await context.newPage();

    try {
        const authDir = path.resolve('./tests/.auth');
        if (!fs.existsSync(authDir)) {
            fs.mkdirSync(authDir, {recursive: true});
        }

        const cookiePath = path.resolve(authDir + '/cookies.json');
        const authStoragePath = path.resolve(authDir + '/user.json');

        // Optional: Load existing cookies (if using cookies instead of storageState)
        if (fs.existsSync(cookiePath)) {
            const cookies = JSON.parse(fs.readFileSync(cookiePath, 'utf-8'));
            await context.addCookies(cookies);
        }

        // Navigate to login page
        const baseURL = config.projects[0].use?.baseURL ?? 'http://localhost:3000';
        await page.goto(`${baseURL}/signin`);

        // Perform login actions
        // await page.fill('input[name="email"]', process.env.TEST_EMAIL || 'admin@gmail.com');
        await page.locator('input[name="email"]').fill(process.env.TEST_EMAIL || 'admin@gmail.com');
        await page.locator('input[name="password"]').fill(process.env.TEST_PASSWORD || 'Winner@69');
        await page.click('button[type="submit"][name="sign-in-with-email-password"]');

        // Wait until redirected to dashboard (or any post-login URL)
        console.log('Waiting for dashboard redirect...');
        await page.waitForURL('**/admin/dashboard**', {timeout: 15000});
        console.log('Redirect successful! Saving state...');

        // Save cookies (optional — mostly useful for debugging)
        const cookies = await context.cookies();
        fs.writeFileSync(cookiePath, JSON.stringify(cookies, null, 2));

        // Save full storage state (cookies + localStorage) for test reuse
        await context.storageState({path: authStoragePath});

        await browser.close();
    } catch (error) {
        console.error('Error during global setup:', error);
        // generate screenshot
        const screenshotPath = `./tests/screenshots/sign-in-error.png`;
        await page.screenshot({path: screenshotPath, fullPage: true});
    }

}

export default globalSetup;
