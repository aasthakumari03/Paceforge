const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Set viewport to 16:9
        await page.setViewport({ width: 1920, height: 1080 });

        // Navigate and wait for network idle
        console.log('Navigating to localhost:3000...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        // Slight delay for animations
        await new Promise(r => setTimeout(r, 2000));

        const outputPath = '/home/nytheris/.gemini/antigravity/brain/e9ae7ba3-f27a-45db-8605-8fb8ebbebefe/paceforge_home_snapshot.png';
        console.log(`Saving screenshot to ${outputPath}`);

        await page.screenshot({ path: outputPath, fullPage: true });

        await browser.close();
        console.log('Done.');
    } catch (e) {
        console.error('Screenshot failed:', e);
        process.exit(1);
    }
})();
