import { create } from "zustand";

type Store = {
  leftPlayer: string;
  rightPlayer: string;
  setPlayer: (name: string, value: string) => void;
};

export const usePlayers = create<Store>()((setState) => ({
  leftPlayer: "",
  rightPlayer: "",
  setPlayer: (name, value) => {
    switch (name) {
      case "leftPlayer":
        setState((prev) => ({ ...prev, leftPlayer: value }));
        break;
      case "rightPlayer":
        setState((prev) => ({ ...prev, rightPlayer: value }));
        break;
    }
  },
}));
