import BookType from "./BookType";
import UserType from "./UserType";

export default interface LoanType {
  id: number;
  book: BookType;
  peminjam: string;
  kelas: string;
  is_returned: number;
  user: UserType;
  return_date: string;
  created_at: string;
  updated_at: string;
}

export interface LoanPagination {
  current_page: number;
  data: LoanType[];
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
