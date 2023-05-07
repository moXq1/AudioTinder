import { Like } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkLike } from "@/app/actions/checkLike";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { like }: { like: Like } = body;

  if (!currentUser || !like.to_user_id) {
    return NextResponse.error();
  }

  const isLiked = await checkLike(like);

  if (isLiked) {
    const match = await prisma.match.create({
      data: {
        userAId: currentUser.id,
        userBId: like.to_user_id,
      },
    });

    return NextResponse.json(match);
  }
  return NextResponse.json(false);
}
