"use client";

import { Like } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillCloseCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

import { useLike } from "../hooks/useLike";
import { useMatch } from "../hooks/useMatch";
import { useMatchModal } from "../hooks/useMatchModal";
import { SafeUser } from "../types";

interface HeartButtonProps {
  handleNextCard: () => void;
  currentUser: SafeUser | null;
  likeId: string;
  mode: "like" | "dislike";
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  likeId,
  mode,
  handleNextCard,
}) => {
  const { toggleLike } = useLike({
    likeId,
    currentUser,
  });
  const { setId, onOpen } = useMatchModal();

  const { createMatch } = useMatch();

  const [hover, setHover] = useState(false);

  const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    toggleLike(e, mode === "like")
      .then(async (res) => {
        if (res.status !== 200) {
          toast.error("failed to like");
        } else {
          const like: Like = res.data;
          if (like.is_liked) {
            toast.success("Liked");
          } else {
            toast.success("Disliked");
          }
          return like;
        }
      })
      .then((like) => {
        if (like) {
          createMatch(like)
            .then((res) => {
              if (res.data) {
                console.log(res.data);
                toast.success("Match Created");
                setId(res.data.id);
                onOpen();
              } else {
                toast.success("No match");
              }
            })
            .catch((e) => {
              toast.error("Something went wrong (No match) ");
            });
        }
      })
      .catch(() => {
        toast.error("failed to like");
      })
      .finally(() => handleNextCard());
  };

  return (
    <div
      onClick={handleLike}
      className="relative hove-opacity-80 transition cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {mode === "like" && (
        <>
          <AiOutlineHeart
            size={48}
            className="fill-black absolute -top-[2px] -right-[2px]"
          />
          <AiFillHeart
            size={44}
            className={hover ? " fill-green-500" : "fill-neutral-500/20"}
          />
        </>
      )}
      {mode === "dislike" && (
        <>
          <AiOutlineCloseCircle
            size={48}
            className="fill-black absolute -top-[2px] -right-[2px]"
          />
          <AiFillCloseCircle
            size={44}
            className={hover ? "fill-rose-500" : "fill-neutral-500/20"}
          />
        </>
      )}
    </div>
  );
};
