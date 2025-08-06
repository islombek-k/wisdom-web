export interface WordbankFolder {
  id: number;
  user_id: number;
  name: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface WordbankListResponse {
  status: boolean;
  folders: WordbankFolder[];
  wordbanks: any[];
}

export interface CreateFolderRequest {
  name: string;
}

export interface CreateFolderResponse {
  status: boolean;
  folder: WordbankFolder;
}

export interface CreateWordbankRequest {
  folder_id: number;
  word_id: number;
  word_parent_id: number;
  word: string;
  translation: string;
  number: number;
  type: string;
  word_class: string;
}

export interface CreateWordbankResponse {
  status: boolean;
  message?: string;
}
