import { create } from "zustand";

export const useStore = create((set) => ({
  city: "Dhaka",
  setCity: (cityVal) => set((state) => ({ city: cityVal })),
}));
