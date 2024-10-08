import type { Bottles, SubscriptionType } from "src/services/subscriptions/types";
import { getPrices } from "./utils";

export const getAnalyticsName = (type: SubscriptionType) => {
  const mapper: Record<SubscriptionType, string> = {
    one: "one_bottle_button_click",
    two: "two_bottle_button_click",
    special: "special_bottle_button_click",
    set: "set_bottle_button_click",
  };

  return mapper[type];
};

export const getSubscriptionTypeColor = (type: SubscriptionType) => {
  const mapper: Record<SubscriptionType, string> = {
    one: "#b6b9cf",
    two: "#e59fa3",
    special: "#b6ad9f",
    set: "#CFCEB6",
  };

  return mapper[type];
};

export const getSubscriptionTypeText = (type: SubscriptionType) => {
  const mapper: Record<SubscriptionType, { mobile: string; desktop: string }> =
    {
      one: { mobile: "1 пляшка", desktop: "Одна пляшка" },
      two: { mobile: "2 пляшки", desktop: "Дві пляшки" },
      special: { mobile: "Рідкісна", desktop: "Одна, але рідкісна" },
      set: { mobile: "Ящик", desktop: "Ящик вина" },
    };

  return mapper[type];
};

export const getFormPageTitle = (type: SubscriptionType) => {
  const defaultTitle = "Підписка на вино";
  const mapper: Record<SubscriptionType, string> = {
    one: defaultTitle,
    two: defaultTitle,
    special: defaultTitle,
    set: "Передзапис на ящик вина",
  };

  return mapper[type];
};

export const getFormPageDescription = (type: SubscriptionType) => {
  const defaultDescription =
    "Щоб підписатись заповніть форму нижче. Після оплати ми напишемо вам підтвердження в Телеграмі та запитаємо дані для доставки. Відправляємо вино Новою Поштою за наш рахунок.";

  const mapper: Record<SubscriptionType, string> = {
    one: defaultDescription,
    two: defaultDescription,
    special: defaultDescription,
    set: "Для того щоб передзаписатись заповніть форму нижче. Оплачувати нічого не потрібно — найближчим часом ми звʼяжемось з вами в Телеграмі та обговоримо деталі замовлення.",
  };

  return mapper[type];
};

export const getFormSubmitButtonText = ({
  type,
  bottles,
  months,
}: {
  type: SubscriptionType;
  bottles: Bottles;
  months: number;
}) => {
  const defaultText = `Підписатись за ${getPrices(bottles, months).sum} ₴`;
  const mapper: Record<SubscriptionType, string> = {
    one: defaultText,
    two: defaultText,
    special: defaultText,
    set: "Передзаписатись",
  };

  return mapper[type];
};

export const getMonthsText = (months: number) => {
  const mapper: Record<number, string> = {
    1: "місяць",
    3: "місяці",
    6: "місяців",
    12: "місяців",
  };

  return mapper[months];
};

export const getMonthsTextDescription = (months: number) => {
  const mapper: Record<number, string> = {
    1: "місяця",
    3: "місяців",
    6: "місяців",
    12: "місяців",
  };

  return mapper[months];
};

export const getDescription = (type: SubscriptionType) => {
  const mapper: Record<SubscriptionType, string> = {
    one: "Вам приїде одна хороша пляшка вина, яку ретельно підбере Рома Ремеєв.",
    two: 'Вам приїде одна хороша пляшка вина та одна дуже хорошa пляшка, які ретельно підбере <span class="wh-nowrap">Рома Ремеєв</span>.',
    special:
      'Вам приїде одна неймовірна рідкісна пляшка вина, яку ретельно підбере <span class="wh-nowrap">Рома Ремеєв</span>.',
    set: "Вам приїде шість хороших пляшок вина, які ретельно підбере Рома Ремеєв.",
  };

  return mapper[type];
};

interface Page {
  slug: string;
  type: SubscriptionType;
  bottles: Bottles;
  months: number;
}

export const pages: Page[] = [
  {
    slug: "1-in-1",
    type: "one",
    bottles: 1,
    months: 1,
  },
  {
    slug: "1-in-3",
    type: "one",
    bottles: 1,
    months: 3,
  },
  {
    slug: "1-in-6",
    type: "one",
    bottles: 1,
    months: 6,
  },
  {
    slug: "1-in-12",
    type: "one",
    bottles: 1,
    months: 12,
  },
  {
    slug: "2-in-1",
    type: "two",
    bottles: 2,
    months: 1,
  },
  {
    slug: "2-in-3",
    type: "two",
    bottles: 2,
    months: 3,
  },
  {
    slug: "2-in-6",
    type: "two",
    bottles: 2,
    months: 6,
  },
  {
    slug: "2-in-12",
    type: "two",
    bottles: 2,
    months: 12,
  },
  {
    slug: "special-in-1",
    type: "special",
    bottles: "special",
    months: 1,
  },
  {
    slug: "special-in-3",
    type: "special",
    bottles: "special",
    months: 3,
  },
  {
    slug: "special-in-6",
    type: "special",
    bottles: "special",
    months: 6,
  },
  {
    slug: "special-in-12",
    type: "special",
    bottles: "special",
    months: 12,
  },
  {
    slug: "set-in-1",
    type: "set",
    bottles: "set",
    months: 1,
  },
  {
    slug: "set-in-3",
    type: "set",
    bottles: "set",
    months: 3,
  },
  {
    slug: "set-in-6",
    type: "set",
    bottles: "set",
    months: 6,
  },
  {
    slug: "set-in-12",
    type: "set",
    bottles: "set",
    months: 12,
  },
];
