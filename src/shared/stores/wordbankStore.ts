import { create } from "zustand";

interface translationItem {
  id?: number;
  word: string;
  star?: number;
  word_class?: string;
  type?: string;
}

interface WordbankStore {
  translation: translationItem;
  setTranslation: (translation: translationItem) => void;
}

export const useWordbankStore = create<WordbankStore>((set) => ({
  translation: { word: "", star: 0, word_class: "", type: "", id: 0 },
  setTranslation: (translation) => set({ translation }),
}));
