import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });


// Define flags and fallbacks
const isCI = !!process.env.CI; // Check if running in CI/CD environment
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${PORT}`;

// Playwright configuration
export default defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.ts',
    globalSetup: './tests/global-setup.ts', // Global authentication setup

    fullyParallel: true, // Run tests in parallel to speed up testing
    forbidOnly: isCI, // Prevent accidental commits with .only in CI
    retries: isCI ? 2 : 0, // Retry failed tests (only in CI)
    workers: isCI ? 1 : undefined, // Limit to 1 worker in CI to avoid resource contention

    reporter: 'html', // Use HTML reporter for better visualization of test results

    // Automatically start your Next.js dev or prod server before tests
    webServer: {
        // Use dev server locally, production server in CI
        command: isCI
            ? 'npm run build && npm run start'
            : 'npm run dev',
        port: +PORT,
        reuseExistingServer: !isCI, // Reuse existing server in local development
        timeout: 120 * 1000, // Allow extra time for server to boot up
    },

    use: {
        baseURL: BASE_URL,
        headless: true, // Run tests in headless mode (browser won't be visible)
        trace: 'on-first-retry', // Capture trace for debugging
        video: 'on-first-retry', // Capture video for failed tests
        screenshot: 'only-on-failure', // Capture screenshot only on failure
        storageState: './tests/.auth/user.json', // Use storage state for authentication
    },

    // Define which browsers and devices to run tests on
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
