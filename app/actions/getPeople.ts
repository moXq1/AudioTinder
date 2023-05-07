import prisma from "@/prisma/client";

import { getCurrentUser } from "./getCurrentUser";

export async function getPeople() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const currentUserLikes = await prisma.like.findMany({
    where: {
      user_id: currentUser.id,
    },
  });

  const liked = currentUserLikes.map((u) => u.to_user_id);

  const people = await prisma.user.findMany({
    where: {
      NOT: {
        id: {
          in: [currentUser.id, ...liked],
        },
      },
    },
  });

  const safePeople = people.map((p) => {
    return {
      ...p,
      created_at: p.created_at.toISOString(),
      updated_at: p.updated_at.toISOString(),
    };
  });

  return safePeople || [];
}
