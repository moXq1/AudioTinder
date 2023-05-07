import prisma from "@/prisma/client";

import { getCurrentUser } from "./getCurrentUser";

export async function getMessages(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const messages = await prisma.message.findMany({
    where: {
      match_id: id,
    },
    orderBy: {
      created_at: "asc",
    },
  });

  const safeMessages = messages.map((m) => {
    return {
      ...m,
      created_at: m.created_at.toISOString(),
      updated_at: m.updated_at.toISOString(),
    };
  });

  return safeMessages || [];
}
