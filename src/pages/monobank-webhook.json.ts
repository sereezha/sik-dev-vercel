import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  return new Response(null, { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    console.log(import.meta.env.BOT_TOKEN);

    // Validate the payload
    if (!payload.invoiceId || !payload.status) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
      });
    }

    const obj = {
      chat_id: import.meta.env.CHAT_ID,
      text: `
      <br />
<b>InvoiceId</b>: ${payload.invoiceId}
<b>Status</b>: ${payload.status}
${payload.failure && `<b>Failure Reason</b>: ${payload.failureReason}`}
    `,
    };

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
