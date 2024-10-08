import {
  defineAction,
  ActionError,
  type ActionAPIContext,
} from "astro:actions";
import { z } from "astro:schema";
import { PHONE_REGEX } from "src/constants/regex";

const formInput = z.object({
  phone: z.string().min(1),
  email: z.string().email(),
  bottles: z.string().min(1),
  months: z.string().min(1),
});

const handler =
  ({
    googleSheetUrl,
    botToken,
    chatId,
  }: {
    googleSheetUrl: string;
    botToken: string;
    chatId: string;
  }) =>
  async (input: {
    phone: string;
    email: string;
    bottles: string;
    months: string;
  }) => {
    const { phone, email, bottles, months } = input;
    try {
      const tg = {
        token: botToken,
        chat_id: chatId,
      };

      if (
        !email ||
        phone.trim() === "$" ||
        !bottles ||
        !months ||
        phone.match(PHONE_REGEX) === null
      ) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Bad Request",
        });
      }

      const formData = new FormData();

      formData.append("Phone", phone);
      formData.append("Email", email);
      formData.append("Bottles", bottles);
      formData.append("Months", months);

      const obj = {
        chat_id: tg.chat_id,
        text: `
<b>Phone</b>: ${phone}
<b>Email</b>: ${email}
<b>Bottles</b>: ${bottles}
<b>Months</b>: ${months}
`,
      };

      const promises = [
        fetch(googleSheetUrl as string, {
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

      try {
        const result = await Promise.allSettled(promises);
        const isSomePromiseSuccess = result.some(
          (res) => res.status === "fulfilled" && res.value.ok,
        );

        if (!isSomePromiseSuccess) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Bad Request",
          });
        }

        return {
          ok: true,
          statusCode: 200,
          body: JSON.stringify({ message: "success" }),
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };
      } catch (e: any) {
        return {
          statusCode: 404,
          body: e.toString(),
        };
      }
    } catch (e: any) {
      console.log("ERROR:", e);
      return {
        ok: false,
        statusCode: 400,
        body: JSON.stringify({
          e: JSON.stringify(e),
          success: false,
          error: "Internal Server Error",
        }),
      };
    }
  };

export const subscribeForms = {
  submitSubscriptionForm: defineAction({
    input: formInput,
    handler: handler({
      googleSheetUrl: import.meta.env.GOOGLE_SHEET,
      botToken: import.meta.env.BOT_TOKEN,
      chatId: import.meta.env.CHAT_ID,
    }),
  }),
  submitSetPreOrderForm: defineAction({
    input: formInput,
    handler: handler({
      googleSheetUrl: import.meta.env.GOOGLE_SHEET,
      botToken: import.meta.env.BOT_TOKEN,
      chatId: import.meta.env.CHAT_ID,
    }),
  }),
};
