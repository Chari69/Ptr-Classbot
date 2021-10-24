const { chromium } = require('playwright-extra');

(async () => {
    const browser = await chromium.launch({
        executablePath: 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        headless: false
    });

    //const context = await browser.newContext({
    //    userAgent: "Mozilla/5.0 (Windows NT 6.1; rv:87.0) Gecko/20100101 Firefox/87.0"
    //});

    const page = await browser.newPage();
    await page.goto('https://www.google.com/recaptcha/api2/demo')

    await page.fill('input[type="email"]', "email");
    await page.click("#identifierNext");

    await page.fill('input[type="password"]', "password");
    await page.click("#passwordNext");

    await browser.close();
})();