const puppeteer = require('puppeteer');
const config = require("../config");
const fs = require('fs')

class PrerenderService {
    url
    directory
    constructor(url = 'https://example.org') {
        this.url = url
    }

    async prerender() {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(this.url)
        this.addPageToCache(page, browser)
        return page.content()
    }

    /**
     * Create a slug
     * @param {String} title 
     * @returns String
     */
    createTitleSlug(title = '') {
        return title.split(' ').join('_').toLowerCase()
    }

    /**
     * Add the fetched rendered page to cache
     * @param {Array} page 
     */
    async addPageToCache(page, browser) {
        const directory = new URL(this.url).hostname
        fs.mkdir(`./output/${directory}`, (err) => {
            console.warn(err);
        })
        const titleSlug = this.createTitleSlug(await page.title())
        fs.writeFileSync(`./output/${directory}/${titleSlug}.html`, (await page.content()), { encoding: "utf-8" })

        await browser.close()
    }
}

module.exports = PrerenderService
