import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import webmanifest, { WebmanifestOptions } from "astro-webmanifest";
import { defineConfig } from "astro/config";
import { dirname } from "path";
import directive from "remark-directive";
import { fileURLToPath } from "url";
import admonitionsPlugin from "./plugins/admonitions.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type {WebmanifestOptions}
 */
const webmanifestOptions = {
  name: "License-Cop",
  icon: __dirname + "/src/images/favicon.svg",
  short_name: "License-Cop",
  description: "Yet another license checker tool for your dependencies; focused on simplicity.",
  start_url: "/",
  theme_color: "#2666d5",
  background_color: "#2666d5",
  display: "standalone"
};

export default defineConfig({
  outDir: "../../dist/apps/website",
  site: "https://license-cop.js.org",

  build: {
    format: "file"
  },

  integrations: [mdx(), sitemap(), webmanifest(webmanifestOptions)],

  markdown: {
    remarkPlugins: [directive, admonitionsPlugin],
    shikiConfig: {
      theme: "light-plus",
      wrap: true
    }
  }
});
