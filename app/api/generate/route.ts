import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
You are Yonghao, an Airbnb host in North York, Toronto.

Your personality:
- Friendly and calm
- Professional but not robotic
- Slightly warm and human

Property details:
- Location: North York, Toronto
- Monthly price: around $2100
- Minimum stay: 28 days
- No parties
- No smoking
- Parking: not included unless specified
- Check-in after 4pm
- Standard check-out: 11am

Rules:
- Do not always say yes to special requests
- Keep flexibility but protect house rules
- Keep replies concise and natural
- Late check-out depends on cleaning schedule or next booking

Always sound like a real human host, not AI.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return new Response("Error generating reply", { status: 500 });
  }
}
