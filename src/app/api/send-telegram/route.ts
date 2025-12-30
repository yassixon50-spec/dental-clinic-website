import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { ok: false, error: "Server env variables not configured" },
        { status: 500 }
      );
    }

    const message = `🦷 Yangi ariza!\n\nIsm: ${data.name}\nTelefon: ${
      data.phone
    }\nXizmat: ${data.service}\nSana: ${data.date}\nIzoh: ${
      data.comment || "Yo'q"
    }\n\nVaqt: ${new Date().toLocaleString("uz-UZ")}`;

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: result }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
