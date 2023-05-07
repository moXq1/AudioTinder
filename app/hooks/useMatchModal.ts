import { create } from "zustand";

interface MatchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (newId: string) => void;
}

export const useMatchModal = create<MatchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: "",
  setId: (newId: string) => set({ id: newId }),
}));
