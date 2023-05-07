import prisma from "@/prisma/client";

import { getCurrentUser } from "./getCurrentUser";

export async function getCurrentMatches() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const matches = await prisma.match.findMany({
    where: {
      OR: [{ userAId: currentUser.id }, { userBId: currentUser.id }],
    },
    include: {
      userA: true,
      userB: true,
      messages: true,
    },
  });

  const safeMatches = matches.map((match) => {
    return {
      ...match,
      userA: {
        ...match.userA,
        created_at: match.userA.created_at.toISOString(),
        updated_at: match.userA.updated_at.toISOString(),
      },
      userB: {
        ...match.userB,
        created_at: match.userB.created_at.toISOString(),
        updated_at: match.userB.updated_at.toISOString(),
      },
    };
  });

  return safeMatches || [];
}
