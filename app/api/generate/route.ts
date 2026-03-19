import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, listingInfo } = await req.json();

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

Instructions:
- Use the listing information provided by the user as the source of truth
- If the listing information is missing, still reply helpfully and naturally
- Do not make up details that are not provided
- Do not always say yes to special requests
- Keep flexibility but protect house rules
- Keep replies concise and natural
- Always sound like a real human host, not AI
          `,
        },
        {
          role: "user",
          content: `
Listing information:
${listingInfo || "No listing information provided."}

Guest message:
${message}
          `,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}

