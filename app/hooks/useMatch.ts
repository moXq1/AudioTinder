import { Like } from "@prisma/client";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

export function useMatch() {
  const createMatch = useCallback((like: Like) => {
    return axios.post(`/api/match`, { like });
  }, []);

  return { createMatch };
}
