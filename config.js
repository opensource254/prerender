const config = {
    /**Default browser */
    defaultBrowser: process.env.Default_BROWSER || '',
    /**Browser excecutable path */
    excecutablePath: process.env.EXCECUTABLE_PATH || ''
}

module.exports = Object.freeze(config)
