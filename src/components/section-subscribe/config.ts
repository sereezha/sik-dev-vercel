import type { SubscriptionType } from "src/services/subscriptions/types";

export const bottlesMap = {
  one: 1,
  two: 2,
  special: "special",
};

export const benefits = [
  {
    id: crypto.randomUUID(),
    title:
      "Картка <span class='wh-nowrap'>з QR-кодом</span>, що веде <span class='wh-nowrap'>на персональне</span> відео",
  },
  {
    id: crypto.randomUUID(),
    title:
      "Картка <span class='wh-nowrap'>з порадами</span> фудпейрингу <span class='wh-nowrap'>під ваше вино</span>",
  },
  {
    id: crypto.randomUUID(),
    title: "<span class='wh-nowrap'>та маленькі</span> приємності",
  },
];

export const getBenefitsList = (type: SubscriptionType) => {
  const title = {
    one: "Та сама таємнича пляшка",
    two: "Дві пляшки вина",
    special: "Одна рідкісна пляшка",
  }[type];

  return [{ id: crypto.randomUUID(), title }, ...benefits];
};
