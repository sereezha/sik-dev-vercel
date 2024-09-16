import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  site: "https://hovorovskyi.com",
  output: "server",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [mkcert()],
    server: {
      https: true,
    },
  },

  integrations: [
    sitemap(),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
