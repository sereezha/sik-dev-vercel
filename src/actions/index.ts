import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  submitSubscriptionForm: defineAction({
    input: z.object({
      phone: z.string().min(1),
      telegram: z.string().min(1),
      bottles: z.string().min(1),
      months: z.string().min(1),
    }),
    handler: async ({ phone, telegram, bottles, months }, context) => {
      const url = `https://sik-backend-dev.netlify.app/.netlify/functions/send?phone=${phone}&telegram=${telegram}&bottles=${bottles}&months=${months}`;
      const response = await fetch(url);
      return { ok: response.ok };
    },
  }),
};
