import bcrypt, { hash } from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/prisma/client";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password, audio } = body.data;

  if (email && password && audio) {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      NextResponse.error();
    }

    const securePassword = await hash(password, 12);

    try {
      const currentUser = await prisma.user.create({
        data: {
          email,
          name,
          password: securePassword,
          audioUrl: audio,
        },
      });
      return NextResponse.json(currentUser);
    } catch (err) {
      NextResponse.error();
    }
  } else {
    NextResponse.error();
  }
}
