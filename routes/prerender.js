const PrerenderService = require('../services/prerender')
const Router = require('express').Router()

Router.get('/', async (req, res) => {
    const url = req.query.url
    const prerender = new PrerenderService(url)
    try {
        const html = await prerender.prerender()
        res.send(html)
    } catch (error) {
        res.status(500).json(error)
    }


})

module.exports = Router
