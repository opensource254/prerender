const puppeteer = require('puppeteer');
const config = require("../config");
const { enabled } = require('../app');

class PrerenderService {
    url
    constructor(url = 'https://example.org') {
        this.url = url
    }

    async prerender() {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(this.url)
        page.setJavaScriptEnabled(true)
        return page.content()
    }
}

module.exports = PrerenderService
