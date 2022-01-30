const util = require('util')
const {DateTime} = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss");
const {parseHTML} = require('linkedom')

module.exports = config => {
    config.addFilter('console', data => util.inspect(data))
    config.addFilter('readabledate', data => 
        DateTime.fromJSDate(data).toLocaleString(DateTime.DATE_FULL))
    config.addFilter('excerpt', (data, length) => {
        const {document} = parseHTML(`<html>${data}</html>`)
        const text = [...document.querySelectorAll('html > p')]
            .reduce((pre, cur) => pre + cur.textContent, '')
        return text.slice(0, length) + '...'
    })

    config.addPassthroughCopy("assets")
    config.addPlugin(pluginRss);
    config.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("posts/*.md");
    })
}
