import type { APIRoute } from "astro";
import sendpulse from 'sendpulse-api';

const API_USER_ID = "f5672714ec9f64043cb4feeafc0fa09a"; // From SendPulse dashboard
const API_SECRET = "a59dad5edc5b08b97e608957593e7f4b";
const TOKEN_STORAGE = "/tmp/";          // Temp storage for API tokens

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  return new Response(null, { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    const formData = new FormData();

    formData.append("Phone", payload.invoiceId);
    formData.append("PaymentStatus", payload.status);

    // Validate the payload
    if (!payload.invoiceId || !payload.status) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
      });
    }

    const obj = {
      chat_id: import.meta.env.CHAT_ID,
      text: `
<b>InvoiceId</b>: ${payload.invoiceId}
<b>Status</b>: ${payload.status}
${payload.status === 'failure' ? `<b>Failure Reason</b>: ${payload.failureReason}` : ""}
    `,
    };

    await fetch(import.meta.env.GOOGLE_SHEET as string, {
      method: "POST",
      body: formData,
    });
    await fetch(
      `https://api.telegram.org/bot${import.meta.env.BOT_TOKEN}/sendMessage?parse_mode=html`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(obj),
      },
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 400,
    });
  }
};

// //   try {
// //     const payload = await request.json();

// //     const obj2 = {
// //       chat_id: import.meta.env.CHAT_ID,
// //       text: `
// //       ${JSON.stringify(payload)}
// //     `,
// //     };

// //     fetch(
// //       `https://api.telegram.org/bot${import.meta.env.BOT_TOKEN}/sendMessage?parse_mode=html`,
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json; charset=UTF-8",
// //         },
// //         body: JSON.stringify(obj2),
// //       },
// //     );

// //     // Validate the payload
// //     if (!payload.invoiceId || !payload.status) {
// //       return new Response(JSON.stringify({ error: "Invalid payload" }), {
// //         status: 400,
// //       });
// //     }

// //     const obj = {
// //       chat_id: import.meta.env.CHAT_ID,
// //       text: `
// //       ${payload.status}
// //     `,
// //     };

// //     fetch(
// //       `https://api.telegram.org/bot${import.meta.env.BOT_TOKEN}/sendMessage?parse_mode=html`,
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json; charset=UTF-8",
// //         },
// //         body: JSON.stringify(obj),
// //       },
// //     );

// //     return new Response(JSON.stringify({ success: true }), { status: 200 });
// //   } catch (error) {
// //     console.error("Error processing webhook:", error);
// //     return new Response(JSON.stringify({ error: "Internal server error" }), {
// //       status: 500,
// //     });
// //   }
// // };
