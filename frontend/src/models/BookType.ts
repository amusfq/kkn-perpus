import AuthorType from "./AuthorType";
import LanguageType from "./LanguageType";
import PublisherType from "./PublisherType";
import ShelfType from "./ShelfType";

export default interface BookType {
  id: number;
  title: string;
  cover: string;
  published_date: string;
  quantity: number;
  isbn: string;
  slug: string;
  description: string;
  pages: string;
  created_at: string;
  updated_at: string;
  views_count: number;
  author: AuthorType;
  shelf: ShelfType;
  publisher: PublisherType;
  language: LanguageType;
}

export interface BookPagination {
  current_page: number;
  data: BookType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
