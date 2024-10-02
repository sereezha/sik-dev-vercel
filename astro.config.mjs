import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import partytown from "@astrojs/partytown";

import alpinejs from "@astrojs/alpinejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  site: "https://hovorovskyi.com",
  output: "hybrid",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },
  scopedStyleStrategy: "class",

  integrations: [sitemap(), // partytown({
  //   config: {
  //     forward: ["dataLayer.push", "fbq", "gtag"],
  //   },
  // }),
  icon(), alpinejs()],
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      alias: {
        "@": `${path.resolve(__dirname, "src")}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // path to your scss variables
          additionalData: `@import "@styles/breakpoints.scss";`,
        },
      },
    },
  },
});