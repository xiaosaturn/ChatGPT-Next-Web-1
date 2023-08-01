import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";

export interface NodeServerStore {
  accessCode: string;
  token: string;

  updateToken: (_: string) => void;
}

export const useNodeServerStore = create<NodeServerStore>()(
  persist(
    (set, get) => ({
      token: "",
      accessCode: "",

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
