const util = require('util')
const {DateTime} = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = config => {
    config.addFilter('console', data => util.inspect(data))
    config.addFilter('readabledate', data => 
        DateTime.fromJSDate(data).toLocaleString(DateTime.DATE_FULL))
    config.addPassthroughCopy("assets")
    config.addPlugin(pluginRss);
}
