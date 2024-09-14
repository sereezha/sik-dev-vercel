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
      const PHONE_REGEX = /^\+?3?8?(0\d{9})$/;
      try {
        const tg = {
          token: import.meta.env.BOT_TOKEN,
          chat_id: import.meta.env.CHAT_ID,
        };

        if (
          !telegram ||
          phone.trim() === "$" ||
          !bottles ||
          !months ||
          phone.match(PHONE_REGEX) === null
        ) {
          throw new Error("error");
        }

        const formData = new FormData();

        formData.append("Phone", phone);
        formData.append("Telegram", telegram);
        formData.append("Bottles", bottles);
        formData.append("Months", months);

        const obj = {
          chat_id: tg.chat_id,
          text: `
<b>Phone</b>: ${phone}
${telegram ? `<b>Telegram</b>: ${telegram}` : ""}
<b>Bottles</b>: ${bottles}
<b>Months</b>: ${months}
    `,
        };

        const promises = [
          fetch(import.meta.env.GOOGLE_SHEET as string, {
            method: "POST",
            body: formData,
          }),
          fetch(
            `https://api.telegram.org/bot${tg.token}/sendMessage?parse_mode=html`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(obj),
            },
          ),
        ];

        await Promise.allSettled(promises)
          .then(() => {
            return {
              ok: true,
              statusCode: 200,
              body: JSON.stringify({ message: "success" }),
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            };
          })
          .catch((err) => {
            return {
              statusCode: 404,
              body: err.toString(),
            };
          });

        return {
          ok: true,
          statusCode: 200,
          body: JSON.stringify({ message: "success" }),
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };
      } catch (e) {
        console.log("ERROR:", e);
        return {
          ok: false,
          statusCode: 500,
          body: JSON.stringify({
            success: false,
            error: "Internal Server Error",
          }),
        };
      }
    },
  }),
};
