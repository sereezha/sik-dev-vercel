import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: "https://hovorovskyi.com",
  output: "server",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },

  integrations: [sitemap()],
});
