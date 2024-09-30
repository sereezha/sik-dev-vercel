import type { SubscriptionType } from "src/services/subscriptions/types";

export const getAnalyticsName = (type: SubscriptionType) => {
  const mapper: Record<SubscriptionType, string> = {
    one: "one_bottle_button_click",
    two: "two_bottle_button_click",
    special: "special_bottle_button_click",
  };

  return mapper[type];
};

export const getSubscriptionTypeColor = (type: SubscriptionType) => {
  const mapper: Record<SubscriptionType, string> = {
    one: "#b6b9cf",
    two: "#e59fa3",
    special: "#b6ad9f",
  };

  return mapper[type];
};

export const getSubscriptionTypeText = (type: SubscriptionType) => {
  const mapper: Record<SubscriptionType, { mobile: string; desktop: string }> =
    {
      one: { mobile: "1 пляшка", desktop: "Одна пляшка" },
      two: { mobile: "2 пляшки", desktop: "Дві пляшки" },
      special: { mobile: "Рідкісна", desktop: "Одна, але рідкісна" },
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
  };

  return mapper[type];
};

interface Page {
  slug: string;
  type: SubscriptionType;
  bottles: number | "special";
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
];
