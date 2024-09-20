import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";

export default defineConfig({
  site: 'https://hovorovskyi.com',
  output: "hybrid",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },
  scopedStyleStrategy: "class",

  integrations: [sitemap(), icon()],
  devToolbar: {
    enabled: true,
  },
});
