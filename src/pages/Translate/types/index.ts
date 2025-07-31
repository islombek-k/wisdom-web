export interface TranslateFormData {
  sourceText: string;
  sourceLang: string;
  targetLang: string;
}

export interface TranslateState {
  translatedText: string;
  isTranslating: boolean;
  error: string | null;
}

export interface ModalState {
  isModalOpen: boolean;
  isBookmarkModalOpen: boolean;
  isNewGroupModalOpen: boolean;
  isRecordModalOpen: boolean;
}
