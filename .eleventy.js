const util = require('util')
module.exports = config => {
    config.addFilter('console', data => util.inspect(data))
    config.addPassthroughCopy("assets")
}