const util = require('util')
const {DateTime} = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss");
const {parseHTML} = require('linkedom')
const Cache = require("@11ty/eleventy-cache-assets");
require('dotenv').config()

module.exports = config => {
    
    config.addFilter('console', data => util.inspect(data))
    
    config.addFilter('ghostdate', data => 
        DateTime.fromISO(data).toLocaleString(DateTime.DATE_FULL))
    
    config.addFilter('excerpt', (data, length) => {
        const {document} = parseHTML(`<html>${data}</html>`)
        const text = [...document.querySelectorAll('html > p')]
            .reduce((pre, cur) => pre + cur.textContent, '')
        return text.slice(0, length) + '...'
    })
    
    config.addFilter('h1normalize', data => {
        return data.replaceAll(/h1/g, 'h2')
    })
    
    config.addPassthroughCopy("assets")
    
    config.addPlugin(pluginRss);
    
    config.addGlobalData("meta", {
        "title": "Álfheimr",
        "description": "Fun-loving Academia",
        "url": "https://beta.alfheimr.xyz",
        "rss": "https://beta.alfheimr.xyz/rss.xml",
        "icon": "/assets/logo-big.png", 
        "author": {
            "name": "Wang Zicheng",
            "email": "bwsdmwzc1999@icloud.com"
        },
        "nav": [
            ["Home", "/"],
            ["Essays", "/tag/essay/"],
            ["Reviews", "/tag/review/"],
            ["Editorial", "/tag/editorial/"],
            ["Authors", "/author/"]
        ]
    }
    )

    config.addGlobalData("ghost", async () => {
      let url = process.env.GHOST_URL + "/ghost/api/v3/content/posts/?key=" + process.env.GHOST_API + "&limit=all&include=authors,tags";
      return Cache(url, {
          duration: "5h", 
          type: "json"
      })
    })
}
