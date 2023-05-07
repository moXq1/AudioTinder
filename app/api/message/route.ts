import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { message }: { message: Message } = body;
  console.log(message);

  if (!currentUser || !message.match_id) {
    return NextResponse.error();
  }

  try {
    const messages = await prisma.message.create({
      data: message,
    });

    return NextResponse.json(messages);
  } catch (e) {
    return NextResponse.error();
  }
}
