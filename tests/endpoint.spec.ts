/*
import {test} from '@playwright/test';

// BACKEND-ENDPOINT: This test suite is for testing the authentication server.
test.beforeEach(async ({request, context}) => {
    const res = await request.post((process.env.AUTH_URL || 'http://localhost:3000/api/v1/auth') + '/signin', {
        data: {
            email: process.env.TEST_EMAIL || 'admin@gmail.com',
            password: process.env.TEST_PASSWORD || 'Winner@69'
        },
    });
    if (res.ok()) {
        const cookies = await context.cookies();
        await context.addCookies(cookies);
        console.log('Login successful');
    }

})*/
