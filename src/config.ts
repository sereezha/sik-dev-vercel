import type { AstroSeoProps } from "@astrolib/seo";

export const SITE_BASE_URL = "https://hovorovskyi.com";

export const Config = {
  links: {
    instagram: "https://www.instagram.com/sik.wine",
    telegram: "https://t.me/sikwine",
  },
  anchors: {
    subscribe: "#subscribe",
  },
};

export const Metadata: AstroSeoProps = {
  title: "Сік — підписка на вино",
  description: "Це як Netflix, тільки винний. Підписуєтесь і кожного місяця до вас приїжджатиме одна або дві пляшки вина.",
  canonical: SITE_BASE_URL,
  openGraph: {
    images: [
      {
        url: `${SITE_BASE_URL}/assets/preview.jpg`,
        width: 2400,
        height: 1260,
        alt: "Sik wine logo",
        type: "image/jpeg",
      },
    ],
    site_name: "Підписка на вино",
    url: SITE_BASE_URL,
    type: "website",
    locale: "uk_UA",
    title: "Сік — підписка на вино",
    description: "Це як Netflix, тільки винний. Підписуєтесь і кожного місяця до вас приїжджатиме одна або дві пляшки вина.",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};
