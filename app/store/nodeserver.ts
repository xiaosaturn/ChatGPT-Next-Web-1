import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { StoreKey } from "../constant";

export interface NodeServerStore {
  token: string;

  updateToken: (_: string) => void;
}

export const useNodeServerStore = create<NodeServerStore>()(
  persist(
    (set, get) => ({
      token: "",

      updateToken(token: string) {
        set(() => ({ token }));
      },
    }),
    {
        name: StoreKey.NodeServer,
        version: 1
    },
  ),
);
