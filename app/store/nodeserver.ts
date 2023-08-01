import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";

export interface NodeServerStore {
  accessCode: string;
  token: string;

  updateToken: (_: string) => void;
}

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

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
