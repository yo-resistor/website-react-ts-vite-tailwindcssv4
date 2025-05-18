import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import * as fs from "fs";
import * as path from "path";
import { posts } from "./src/data/posts.js"; // Adjust path as needed

const hostname = "https://yourwebsiteurl.com"; // !! IMPORTANT: Replace with your actual website URL !!

const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/projects", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/blog", changefreq: "daily", priority: 0.9 },
  // Add dynamic blog post URLs
  ...posts.map((post) => ({
    url: `/blog/${post.slug}`,
    changefreq: "weekly", // Or 'monthly', depending on how often you update
    priority: 0.7, // Adjust priority as needed
    lastmod: post.date, // Assuming your post data has a date field
  })),
];

const stream = new SitemapStream({ hostname });

const pipeline = new Readable({
  objectMode: true,
  read() {
    links.forEach((link) => this.push(link));
    this.push(null);
  },
}).pipe(stream);

streamToPromise(pipeline)
  .then((data) => {
    const sitemapPath = path.resolve(__dirname, "public/sitemap.xml");
    fs.writeFileSync(sitemapPath, data.toString());
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
  })
  .catch((error) => {
    console.error("Error generating sitemap:", error);
  });
