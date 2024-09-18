import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://hovorovskyi.com",
  output: "hybrid",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },

  integrations: [sitemap(), mdx()],
});
