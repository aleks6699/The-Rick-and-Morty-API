export type MainContentState = {
  results: Cards;
  loading: boolean;
  error: string;
  info: Info;
};

export type ResponseCharacter = {
  info: Info;
  results: Cards;
};

export type Cards = Card[];
export interface Card {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
}
export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
