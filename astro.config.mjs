import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";

import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://hovorovskyi.com",
  output: "hybrid",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },
  scopedStyleStrategy: "class",

  integrations: [
    sitemap(),
    icon(),
    partytown({
      config: {
        forward: ["dataLayer.push", "fbq", "gtag"],
      },
    }),
  ],
  devToolbar: {
    enabled: true,
  },
});
