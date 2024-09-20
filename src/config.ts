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
  title: "sik",
  description: "ком'юніті людей, які люблять вино",
  canonical: SITE_BASE_URL,
  openGraph: {
    images: [
      {
        url: `${SITE_BASE_URL}/img/preview.jpg`,
        width: 2400,
        height: 1260,
        alt: "Sik wine logo",
        type: "image/jpeg",
      },
    ],
    site_name: "sik",
    url: SITE_BASE_URL,
    type: "website",
    locale: "uk_UA",
    title: "sik",
    description: "ком'юніті людей, які люблять вино",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};
