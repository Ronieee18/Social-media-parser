import puppeteer from 'puppeteer';

export async function POST(req) {
    const body = await req.json();
    const { platform, username, password } = body;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        if (platform === 'facebook') {
            
            await page.goto('https://www.facebook.com');
            await page.type('#email', username);
            await page.type('#pass', password);
            await page.click('button[name="login"]');
            await page.waitForNavigation();

            // Capture data or screenshots
            const screenshot = await page.screenshot({ path: 'facebook_home1.png' });
            return new Response(JSON.stringify({ message: 'Facebook data captured', screenshotPath: 'facebook_home1.png' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });

        } else if (platform === 'twitter') {
            console.log("its twitter account");
            
            await page.goto('https://x.com/i/flow/login', { waitUntil: 'networkidle2' });

            // Step 1: Enter username
            await page.type('input[type="text"]', username);
            await page.click('div[data-testid="LoginForm_Login_Button"]');

            // Step 2: Wait for password field to appear
            await page.waitForSelector('input[name="password"]');
            await page.type('input[name="password"]', password);
            await page.click('div[data-testid="LoginForm_Login_Button"]');

            // Step 3: Wait for navigation after login
            await page.waitForNavigation();

            // Step 4: Navigate to the user's home/profile page
            await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2' });

            // Step 5: Capture the screenshot of posts
            const screenshotPath = `/tmp/${username}_posts.png`; // Path to save the screenshot
            await page.screenshot({ path: screenshotPath, fullPage: true });

            return new Response(JSON.stringify({ message: 'Screenshot taken successfully', screenshotPath }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else if (platform === 'instagram') {
            console.log("Attempting Instagram login");

            await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

            // Step 1: Enter username and password
            await page.type('input[name="username"]', username);
            await page.type('input[name="password"]', password);
            await page.click('button[type="submit"]');
            await page.waitForNavigation();
            // Step 2: Wait for possible OTP input
            // await page.waitForTimeout(5000); // Wait for OTP page to load

            // Check if OTP page is present
            // const otpPage = await page.evaluate(() => document.querySelector('input[name="verificationCode"]') !== null);

            // if (otpPage) {
            //     // OTP page detected, return a response asking for OTP
            //     return new Response(JSON.stringify({ message: 'OTP required', otpPage: true }), {
            //         status: 400,
            //         headers: { 'Content-Type': 'application/json' }
            //     });
            // }

            // // If OTP was detected, but not provided, continue with login after OTP input
            // if (otp) {
            //     await page.type('input[name="verificationCode"]', otp);
            //     await page.click('button[type="submit"]');
            //     await page.waitForNavigation();
            // }

            // // Step 3: Navigate to the user's home/profile page
            // await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2' });

            // // Step 4: Capture the screenshot of the home page
            // const screenshotPath = `/tmp/${username}_home.png`;
            // await page.screenshot({ path: screenshotPath, fullPage: true });

            // return new Response(JSON.stringify({ message: 'Instagram home page screenshot captured', screenshotPath }), {
            //     status: 200,
            //     headers: { 'Content-Type': 'application/json' }
            // });
            const screenshot = await page.screenshot({ path: 'insta.png' });
            return new Response(JSON.stringify({ message: 'Facebook data captured', screenshotPath: 'insta.png' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        return new Response(JSON.stringify({ error: 'An error occurred during scraping' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        await browser.close();
    }
}
