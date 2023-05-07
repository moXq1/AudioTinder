import axios from "axios";
import { useCallback } from "react";

import { SafeUser } from "../types";

interface IUseLike {
  likeId: string;
  currentUser: SafeUser | null;
}

export const useLike = ({ currentUser, likeId }: IUseLike) => {
  const toggleLike = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>, likeValue: boolean) => {
      e.stopPropagation();
      return axios.post(`/api/like/${likeId}`, { likeValue });
    },
    [likeId]
  );

  return { toggleLike };
};
