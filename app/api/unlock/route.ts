import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!process.env.APP_PASSWORD) {
      return NextResponse.json(
        { error: "APP_PASSWORD is not configured." },
        { status: 500 }
      );
    }

    if (password !== process.env.APP_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

