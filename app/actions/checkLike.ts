import { Like } from "@prisma/client";

import prisma from "@/prisma/client";

import { getCurrentUser } from "./getCurrentUser";

export async function checkLike(like: Like) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return false;
  }

  const likedPerson = await prisma.user.findUnique({
    where: { id: like.to_user_id },
    include: { likes: true },
  });

  if (!likedPerson) {
    return false;
  }

  const likedPersonLikes = likedPerson.likes as Like[];
  console.log(likedPersonLikes);

  if (likedPersonLikes && likedPersonLikes.length > 0) {
    for (const l of likedPersonLikes) {
      if (l.to_user_id === currentUser.id && l.is_liked) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}
