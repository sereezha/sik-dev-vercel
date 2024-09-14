import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://sik-dev.netlify.app",
  output: "hybrid",

  build: {
    inlineStylesheets: 'always',
  },

  integrations: [sitemap()],
  adapter: vercel(),
});