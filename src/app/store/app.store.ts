import { create } from "zustand";
import { randomUsername } from "@/app/lib/utils";

type Result = {
  date: number;
  timeSpent: string;
  answers: string;
  scores: number;
};

type State = {
  username: string;
  balance: number;
  results: Result[];
};

type Actions = {
  setUsername: (username: string) => void;
  setBalance: (balance: number) => void;
  setResults: (results: Result) => void;
};

const useAppStore = create<State & Actions>((set) => ({
  username: localStorage.getItem("username") || randomUsername(),
  balance: Number(localStorage.getItem("balance")) || 0,
  results: JSON.parse(localStorage.getItem("results") || "[]"),
  setUsername: (username: string) => set(() => ({ username })),
  setBalance: (balance: number) =>
    set((state) => {
      localStorage.setItem("balance", String(state.balance + balance));
      return { balance: state.balance + balance };
    }),
  setResults: (result: Result) =>
    set((state) => {
      localStorage.setItem(
        "results",
        JSON.stringify([...state.results, result]),
      );
      return { results: [...state.results, result] };
    }),
}));

export { useAppStore };
