import type { AstroSeoProps } from "@astrolib/seo";

export const Metadata: AstroSeoProps = {
  title: "sik",
  description: "ком'юніті людей, які люблять вино",
  canonical: "https://hovorovskyi.com/",
  openGraph: {
    images: [
      {
        url: "https://sik.wine/img/preview.jpg",
        width: 2400,
        height: 1260,
        alt: "Sik wine logo",
        type: "image/jpeg",
      },
    ],
    site_name: "sik",
    url: "https://hovorovskyi.com/",
    type: "website",
    locale: "uk_UA",
    title: "sik",
    description: "ком'юніті людей, які люблять вино",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export const Analytics = {
  facebook: {
    id: "533165442383526",
  },
  google: {
    id: "G-XXXXXXXXXX",
  },
};
