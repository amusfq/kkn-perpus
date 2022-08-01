import DataTable, { TableColumn } from 'react-data-table-component';
import BookType from '../../../models/BookType';

type Props = { data: BookType[] }

export default function PopularBook({ data = [] }: Props) {


  const columns: TableColumn<BookType>[] = [
    {
      name: "Judul Buku",
      selector: (row) => row.title,
    },
    {
      name: "Pengarang",
      selector: (row) => row.author.fullname,
    },
    {
      name: "Penerbit",
      selector: (row) => row.publisher.name,
    },
    {
      name: "Dilihat",
      selector: (row) => row.views_count,
      center: true
    }
  ];

  return (
    <div>

      <div className="border">
        <DataTable
          columns={columns}
          data={data || []}
          highlightOnHover
          persistTableHead
          responsive
          striped
        />
      </div>
    </div>
  )
}