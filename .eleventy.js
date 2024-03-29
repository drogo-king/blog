const util = require("util");
const { DateTime } = require("luxon");
const { parseHTML } = require("linkedom");
const cache = require("@11ty/eleventy-cache-assets");
const embedSvelte = require("eleventy-plugin-embed-svelte");
const { terser } = require("rollup-plugin-terser");
const sveltePreprocess = require("svelte-preprocess");
require("dotenv").config();

module.exports = config => {
	config.addPlugin(embedSvelte, {
		svelteDir: "./svelte",
		rollupPluginSvelteOptions: { preprocess: sveltePreprocess() },
		rollupOutputPlugins: [terser()]
	});

	config.addFilter("console", data => util.inspect(data));

	config.addFilter("ghostdate", data => DateTime.fromISO(data).toLocaleString(DateTime.DATE_FULL));

	config.addFilter("excerpt", (data, length) => {
		const { document } = parseHTML(`<html>${data}</html>`);
		const text = [...document.querySelectorAll("html > p")].reduce((pre, cur) => pre + cur.textContent, "");
		return text.slice(0, length) + "...";
	});

	config.addFilter("hnormalize", data => {
		return data
			.replace(/h5/g, "h6")
			.replace(/h4/g, "h5")
			.replace(/h3/g, "h4")
			.replace(/h2/g, "h3")
			.replace(/h1/g, "h2");
	});

	config.addFilter("fuckbr", data => {
		return data.replace(/<br>/g, "</p><p>");
	});

	config.addFilter("tagfilter", (posts, tag) => {
		return posts.filter(post => post.primary_tag && post.primary_tag.slug == tag);
	});

	config.addFilter("authorfilter", (posts, author) => {
		return posts.filter(post => post.primary_author.slug == author);
	});

	config.addPassthroughCopy("assets");

	config.addGlobalData("meta", {
		url: "https://alfheimr.xyz",
		rss: "https://alfheimr.xyz/rss.xml",
		author: {
			name: "Drogo King",
			email: "drogo@alfheimr.xyz"
		},
		nav: [
			["Home", "/"],
			["Essays", "/tag/essay/"],
			["Reviews", "/tag/review/"],
			["Editorial", "/tag/editorial/"],
			["Authors", "/authors/"]
		]
	});

	config.addGlobalData("ghost", async () => {
		let url =
			process.env.GHOST_URL +
			"/ghost/api/v3/content/posts/?key=" +
			process.env.GHOST_API +
			"&limit=all&include=authors,tags&formats=html,plaintext";
		return cache(url, {
			duration: "1m",
			type: "json"
		});
	});

	config.addGlobalData("authors", async () => {
		let url = `${process.env.GHOST_URL}/ghost/api/v3/content/authors/?key=${process.env.GHOST_API}&limit=all`;
		return cache(url, {
			duration: "1m",
			type: "json"
		});
	});

	config.addGlobalData("settings", async () => {
		let url = `${process.env.GHOST_URL}/ghost/api/v3/content/settings/?key=${process.env.GHOST_API}&limit=all`;
		return cache(url, {
			duration: "1m",
			type: "json"
		});
	});
};
