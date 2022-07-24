export default interface AuthorType {
  id: number;
  fullname: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface AuthorPagination {
  current_page: number;
  data: AuthorType[];
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
