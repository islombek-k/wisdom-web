import { create } from "zustand";

interface translationItem {
  id?: number;
  word: string;
  star?: number;
  word_class?: string;
  type?: string;
}

interface WordbankStore {
  translation: translationItem | null;
  setTranslation: (translation: translationItem) => void;
}

export const useWordbankStore = create<WordbankStore>((set) => ({
  translation: null,
  setTranslation: (translation) => set({ translation }),
}));
