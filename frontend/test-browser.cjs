const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('BROWSER ERROR:', msg.text());
            }
        });
        
        page.on('pageerror', err => {
            console.log('PAGE EXCEPTION:', err.toString());
        });
        
        // Inject auth state
        await page.goto('http://localhost:5173/');
        await page.evaluate(() => {
            localStorage.setItem('cn_token', 'mock-token');
            localStorage.setItem('cn_user', JSON.stringify({
                id: '1234',
                email: 'test@example.com',
                name: null, 
                career: null,
                knownSkills: [],
                progress: {}
            }));
        });
        
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 1000));
        
        // Click Get Started
        console.log('Clicking Get Started...');
        await page.click('a[href="/signup"]');
        
        await new Promise(r => setTimeout(r, 2000));
        console.log('Current URL after click:', page.url());
        
        const content = await page.evaluate(() => document.body.innerHTML);
        console.log('Body length:', content.length);
        if (content.length < 50) {
            console.log('Body content (BLANK SCREEN):', content);
        }
        
        await browser.close();
    } catch (e) {
        console.error('Test script failed:', e);
    }
})();
