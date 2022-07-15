export default interface CategoryType {
  id: number;
  name: string;
  icon: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryPagination {
  current_page: number;
  data: CategoryType[];
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
