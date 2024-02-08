import { create } from "zustand";
import { devtools } from "zustand/middleware";

type InitialState = {
  id: string | null;
  response: string[];
};

const initialState: InitialState = {
  id: null,
  response: [],
};

interface IStore {
  id: string | null;
  response: string[];
  setResponse: (message: string) => void;
  removeResponse: () => void;
  resetResponse: () => void;
  setId: (id: string) => void;
}

export const useStore = create(
  devtools<IStore>((set, get) => ({
    ...initialState,
    setResponse: (message: string) => {
      set((state) => ({ response: [...state.response, message] }));
    },
    removeResponse: () => {
      get().response.length > 0 &&
        set((state) => ({ ...state, response: state.response.slice(1) }));
    },
    resetResponse: () => set({ response: [] }),
    setId: (id: string) => set({ id }),
  }))
);
