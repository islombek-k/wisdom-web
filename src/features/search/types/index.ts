export type SearchType = 
  | 'uz' 
  | 'en' 
  | 'global' 
  | 'globaluz' 
  | 'grammar' 
  | 'culture' 
  | 'phrase' 
  | 'difference' 
  | 'collocation' 
  | 'metaphor' 
  | 'thesaurus' 
  | 'speaking';

export interface SearchRequest {
  type: SearchType;
  search: string;
}

export interface SearchResultItem {
  id: number;
  word: string;
  star: number;
  word_class: string;
  type: 'word' | 'phrase';
}

export interface SearchResponse {
  status: boolean;
  result: SearchResultItem[];
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  searchType: SearchType;
  results: SearchResultItem[];
  timestamp: number;
}