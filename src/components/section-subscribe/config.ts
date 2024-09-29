import type { SubscriptionType } from "src/services/subscriptions/types";
import qrIcon from "@assets/img/qr.png";
import foodPairIcon from "@assets/img/food-pair.png";
import giftsIcon from "@assets/img/gifts.png";
import bottle1Icon from "@assets/img/bottle-1.png";
import bottle2Icon from "@assets/img/bottle-2.png";
import bottleSpecialIcon from "@assets/img/bottle-special.png";

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
    icon: qrIcon,
  },
  {
    id: crypto.randomUUID(),
    title:
      "Картка <span class='wh-nowrap'>з порадами</span> фудпейрингу <span class='wh-nowrap'>під ваше вино</span>",
    icon: foodPairIcon,
  },
  {
    id: crypto.randomUUID(),
    title: "<span class='wh-nowrap'>та маленькі</span> приємності",
    icon: giftsIcon,
  },
];

export const getBenefitsList = (type: SubscriptionType) => {
  const firstItem = {
    one: {
      title: "Та сама таємнича пляшка",
      icon: bottle1Icon,
    },
    two: { title: "Дві пляшки вина", icon: bottle2Icon },
    special: {
      title: "Одна рідкісна пляшка",
      icon: bottleSpecialIcon,
    },
  }[type];

  return [{ id: crypto.randomUUID(), ...firstItem }, ...benefits];
};
