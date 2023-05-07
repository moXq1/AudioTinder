import axios from "axios";
import { getServerSession } from "next-auth/next";

import { AuthOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";

export async function getSession() {
  return await getServerSession(AuthOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  };
}
