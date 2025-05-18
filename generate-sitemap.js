"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var sitemap_1 = require("sitemap");
var stream_1 = require("stream");
var fs = require("fs");
var path = require("path");
var posts_js_1 = require("./src/data/posts.js"); // Adjust path as needed
var hostname = "https://yourwebsiteurl.com"; // !! IMPORTANT: Replace with your actual website URL !!
var links = __spreadArray([
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "monthly", priority: 0.8 },
    { url: "/projects", changefreq: "monthly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.8 },
    { url: "/blog", changefreq: "daily", priority: 0.9 }
], posts_js_1.posts.map(function (post) { return ({
    url: "/blog/".concat(post.slug),
    changefreq: "weekly", // Or 'monthly', depending on how often you update
    priority: 0.7, // Adjust priority as needed
    lastmod: post.date, // Assuming your post data has a date field
}); }), true);
var stream = new sitemap_1.SitemapStream({ hostname: hostname });
var pipeline = new stream_1.Readable({
    objectMode: true,
    read: function () {
        var _this = this;
        links.forEach(function (link) { return _this.push(link); });
        this.push(null);
    },
}).pipe(stream);
(0, sitemap_1.streamToPromise)(pipeline)
    .then(function (data) {
    var sitemapPath = path.resolve(__dirname, "public/sitemap.xml");
    fs.writeFileSync(sitemapPath, data.toString());
    console.log("Sitemap generated successfully at ".concat(sitemapPath));
})
    .catch(function (error) {
    console.error("Error generating sitemap:", error);
});
