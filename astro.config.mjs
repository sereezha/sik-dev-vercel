import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  site: "https://hovorovskyi.com",
  output: "hybrid",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },

  integrations: [sitemap()],
});
