import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

export const prerender = false;

export const server = {
  submitSubscriptionForm: defineAction({
    input: z.object({
      phone: z.string().min(1),
      telegram: z.string().min(1),
      bottles: z.string().min(1),
      months: z.string().min(1),
      invoiceId: z.string().min(1),
      paymentUrl: z.string().min(1),
      status: z.string().min(1),
    }),
    handler: async (
      { phone, telegram, bottles, months, invoiceId, paymentUrl, status },
      context,
    ) => {
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
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Bad Request",
          });
        }

        const formData = new FormData();

        formData.append("Phone", phone);
        formData.append("Telegram", telegram);
        formData.append("Bottles", bottles);
        formData.append("Months", months);
        formData.append("InvoiceId", invoiceId);
        formData.append("PaymentUrl", paymentUrl);
        formData.append("PaymentStatus", status);

        const obj = {
          chat_id: tg.chat_id,
          text: `
<b>Phone</b>: ${phone}
${telegram ? `<b>Telegram</b>: ${telegram}` : ""}
<b>Bottles</b>: ${bottles}
<b>Months</b>: ${months}
<b>InvoiceId</b>: ${invoiceId}
<b>PaymentUrl</b>: ${paymentUrl}
<b>PaymentStatus</b>: ${status}
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
          statusCode: 500,
          body: JSON.stringify({
            e: JSON.stringify(e),
            success: false,
            error: "Internal Server Error",
          }),
        };
      }
    },
  }),
};
