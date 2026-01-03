import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Log for debugging (remove in production)
    console.log("Telegram config:", { 
      hasToken: !!token, 
      hasChat: !!chatId,
      tokenLength: token?.length,
      chatId: chatId 
    });

    if (!token || !chatId) {
      console.log("Missing Telegram credentials");
      return NextResponse.json(
        { ok: false, error: "Server env variables not configured", envNotConfigured: true },
        { status: 500 }
      );
    }

    const message = `🦷 Yangi ariza!\n\nIsm: ${data.name}\nTelefon: ${
      data.phone
    }\nXizmat: ${data.service}\nSana: ${data.date}\nIzoh: ${
      data.comment || "Yo'q"
    }\n\nVaqt: ${new Date().toLocaleString("uz-UZ")}`;

    console.log("Sending to Telegram:", { chatId, messageLength: message.length });

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text: message,
          parse_mode: "HTML"
        }),
      }
    );

    const result = await res.json();
    console.log("Telegram response:", { ok: res.ok, status: res.status, result });

    if (!res.ok) {
      console.error("Telegram API error:", result);
      return NextResponse.json({ 
        ok: false, 
        error: result.description || result.error_code || "Telegram API error",
        telegramError: true 
      }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram send error:", err);
    return NextResponse.json(
      { ok: false, error: String(err), networkError: true },
      { status: 500 }
    );
  }
}
