import { Like } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/prisma/client";

interface IParams {
  likeId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { likeValue } = body;

  if (!currentUser) {
    return NextResponse.error();
  }
  const { likeId } = params;

  if (!likeId || typeof likeId !== "string") {
    throw new Error("Invalid ID");
  }

  const likes: Like[] = await prisma.like.findMany({
    where: {
      user_id: currentUser.id,
    },
  });

  for (let l of likes) {
    if (l.to_user_id === likeId) {
      return NextResponse.error();
    }
  }

  const like = await prisma.like.create({
    data: {
      user_id: currentUser.id,
      is_liked: likeValue,
      to_user_id: likeId,
    },
  });

  return NextResponse.json(like);
}
