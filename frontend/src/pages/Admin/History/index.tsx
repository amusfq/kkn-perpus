import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useStore from "../../../../store/store";
import Axios from "../../../api";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import LoanType, { LoanPagination } from "../../../models/LoanType";
import logout from "../../../../Utils/logout";
import isTokenException from "../../../../Utils/isTokenException";
import moment from "moment";
import Modal from "../../../components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Datepicker from "../../../components/Input/Datepicker";
import Select from "../../../components/Select";
import BookType from "../../../models/BookType";
import 'moment/dist/locale/id'

moment.locale('id');

type Props = {};

interface Values {
  q: string;
}

interface Peminjaman {
  peminjam: string;
  kelas: string;
  return_date: Date | null;
}

const schema = yup
  .object()
  .shape({
    peminjam: yup.string().required("Nama siswa tidak boleh kosong"),
    kelas: yup.string().required("Kelas tidak boleh kosong"),
    return_date: yup.date().required("Tanggal pengembalian tidak boleh kosong"),
  })
  .required();

export default function History({ }: Props) {
  const { setIsLoading, setUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [responsesError, setResponsesError] = useState<String[]>([])
  const [data, setData] = useState<LoanPagination>();
  const [books, setBooks] = useState<BookType[]>([])
  const [selectedBooks, setSelectedBooks] = useState<any[]>([])
  const [selectedBook, setSelectedBook] = useState<Number>()
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<Values>();
  const watchQ = watch('q');
  const { register: registerPeminjam, reset, setValue: setValuePeminjam, watch: watchPeminjam, handleSubmit: handleSubmitPeminjam, formState: { errors: errorsPeminjam } } = useForm<Peminjaman>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const watchTanggal = watchPeminjam('return_date');

  const columns: TableColumn<LoanType>[] = [
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex flex-col space-y-1">
          {row.is_returned != 1 && (
            <button
              className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs text-center"
              onClick={updateStatus(row)}
            >
              <p className="space-x-1">
                <i className="fa-solid fa-check"></i>
                <span>Kembalikan</span>
              </p>
            </button>
          )}
        </div>
      ),
      width: "8rem",
      center: true,
    },
    {
      name: "Peminjam",
      selector: (row) => row.peminjam,
      width: '10rem'
    },
    {
      name: "Kelas",
      selector: (row) => row.kelas,
      center: true,
      width: '8rem'
    },
    {
      name: "Judul Buku",
      selector: (row) => row.book.title
    },
    {
      name: "Pengembalian",
      cell: (row) => moment(row.return_date).fromNow()
    },
    {
      name: "Status",
      cell: (row) =>
        row.is_returned == 1 ? (
          <span className="px-2 py-1 text-white text-xs bg-green-500 rounded">
            Dikembalikan
          </span>
        ) : row.is_returned == -1 ? (<span className="px-2 py-1 text-white text-xs bg-red-500 rounded">
          Telat
        </span>) :
          (<span className="px-2 py-1 text-white text-xs bg-yellow-500 rounded">
            Dipinjam
          </span>)
      ,
      center: true,
    },
  ];


  const updateStatus = (row: LoanType) => () => {
    Swal.fire({
      title: `Anda yakin ingin mengembalikan buku ${row.book.title} ini?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((response) => {
      if (response.isConfirmed) {
        setIsLoading(true);
        Axios.post(`/loan/return/${row.id}`)
          .then(async () => {
            toast.success(
              `Berhasil mengembalikan buku`,
              { theme: "colored" }
            );
            await getData(currentPage, perPage);
          })
          .catch((err) => {
            const response = err.response;
            console.log(response);
            const errors: string[] = Object.values(response.data.errors);
            if (isTokenException(errors)) return logout(setUser, navigate);
            return [];
          })
          .finally(() => setIsLoading(false));
      }
    });
  };

  const getBook = () => {
    setIsLoading(true);
    Axios.get("/book", {
      params: {
        is_pagination: false
      },
    })
      .then((res) => {
        const response = res.data;
        setBooks(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        const errors: string[] = Object.values(response.data.errors);
        if (isTokenException(errors)) return logout(setUser, navigate);
        return [];
      })
      .finally(() => setIsLoading(false));
  }

  const getData = (
    page: number,
    perRow: number,
    q: string | undefined = ""
  ) => {
    setIsLoading(true);
    Axios.get("/loan", {
      params: {
        page: page,
        q: q,
        per_page: perRow,
      },
    })
      .then((res) => {
        const response = res.data;
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        const errors: string[] = Object.values(response.data.errors);
        if (isTokenException(errors)) return logout(setUser, navigate);
        return [];
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (data: Values) => {
    getData(1, perPage, data.q);
  };

  const onSubmitPeminjam = (data: Peminjaman) => {
    let temp: any = { ...data };
    temp.return_date = moment(temp.return_date).format("YYYY-MM-DD");
    if (selectedBooks.length === 0) return toast.error("Belum ada buku dipilih");
    temp.books = selectedBooks.map((book) => ({ id: book.id, qty: book.qty }));
    Axios.post('/loan', temp).then(() => {
      toast.success("Berhasil menyimpan data");
      setSelectedBooks([])
      reset();
      setOpenModal(false);
      getData(1, perPage);
    }).catch((err) => {
      const response = err.response;
      console.log(response);
      const errors: string[] = Object.values(response.data.errors);
      if (isTokenException(errors)) return logout(setUser, navigate);
      return [];
    })
  };

  const handleSelectBook = (e: any) => {
    e.preventDefault();
    if (!selectedBook) return toast.error("Pilih buku terlebih dahulu")
    let temp: any = [...selectedBooks]
    let tempBooks: any = [...books];
    const idx = temp.findIndex((book: any) => book.id === selectedBook)
    let bookIdx: any = tempBooks.findIndex((e: any) => e.id === selectedBook);
    if (idx !== -1) {
      if (temp[idx].quantity === 0) return toast.error("Jumlah buku melebihi stok");
      temp[idx].qty += 1;
      tempBooks[bookIdx].quantity -= 1;
    } else {
      let tempBooks: any = [...books];
      if (bookIdx != -1) {
        tempBooks[bookIdx].qty = 1;
        temp.push(tempBooks[bookIdx]);
        tempBooks[bookIdx].quantity -= 1;
      }
    }
    setBooks(tempBooks);
    setSelectedBooks(temp);
    setSelectedBook(undefined);
  }

  const handleClose = (e: any) => {
    e.preventDefault();
    setOpenModal(false);
  }

  useEffect(() => {
    getBook();
  }, [])

  useEffect(() => {
    getData(currentPage, perPage);
  }, [currentPage, perPage]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row space-x-2 items-center"
          >
            <Input placeholder="Cari.." {...register("q")} />
            <button className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">
              <i className="fa-solid fa-search"></i>
            </button>
          </form>
          <Button primary onClick={() => setOpenModal(true)}>
            Tambah
          </Button>
        </div>
        {
          data && data.data.length > 0 ?
            <div className="border">
              <DataTable
                columns={columns}
                data={data?.data || []}
                paginationTotalRows={data?.total || 0}
                highlightOnHover
                persistTableHead
                pagination
                paginationServer
                responsive
                striped
                onChangePage={(newPage) => setCurrentPage(newPage)}
                onChangeRowsPerPage={(newPerPage) => setPerPage(newPerPage)}
              />
            </div> :
            <div className="text-center py-4">
              <img src="/no-data.svg" alt="" className='w-full md:w-48 mx-auto' />
              <h1 className="text-center font-medium md:text-xl">
                {watchQ ? `Hasil pencarian '${watchQ}' tidak ditemukan` : "Oops, sepertinya data masih kosong"}
              </h1>
            </div>
        }
      </div>
      <Modal title='Pinjam buku' size='4xl' open={openModal} setOpen={setOpenModal}>
        <div>
          {responsesError.length > 0 && (
            <div className="px-3 py-2 bg-red-500 text-white rounded flex flex-row space-x-2">
              <i className="fa-solid fa-triangle-exclamation pt-1"></i>
              <div>
                {responsesError.map((error, idx) => (
                  <p key={idx}>{error}</p>
                ))}
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmitPeminjam(onSubmitPeminjam)}
            className="space-y-4 md:space-y-0 pb-12 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className='md:col-span-2'>
              <Input
                label="Nama Siswa"
                {...registerPeminjam("peminjam")}
                error={errorsPeminjam.peminjam?.message}
              />
            </div>
            <Input
              label="Kelas"
              {...registerPeminjam("kelas")}
              error={errorsPeminjam.kelas?.message}
            />
            <Datepicker label="Tanggal Pengembalian" minDate={new Date()} value={watchTanggal} onChange={e => setValuePeminjam('return_date', e)} error={errorsPeminjam.return_date?.message} />
            <div className='md:col-span-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-end'>
              <div className='md:flex-1'>
                <Select
                  label="Pilih Buku"
                  options={books.filter(book => book.quantity > 0).map((book) => ({ label: `[${book.quantity}] - ${book.title} - ${book.publisher.name}`, value: book.id })) || []}
                  onChange={e => setSelectedBook(e)}
                  value={selectedBook}
                  placeholder="Pilih.."
                />
              </div>
              <div className='text-right'>
                <Button primary onClick={e => handleSelectBook(e)}>Pilih</Button>
              </div>
            </div>
            <div className='md:col-span-4'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='px-2 border text-center'>No</th>
                    <th className='px-2 border text-center'>Judul Buku</th>
                    <th className='px-2 border text-center'>Penerbit</th>
                    <th className='px-2 border text-center'>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBooks.map((book: any, idx: number) => <tr key={book.id}>
                    <td className='border px-2 text-center'>{idx + 1}</td>
                    <td className='border px-2'>{book.title}</td>
                    <td className='border px-2'>{book.publisher.name}</td>
                    <td className='border px-2 text-center'>{book.qty}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div className='md:col-span-4'>
              <div className='flex justify-end space-x-2'>
                <Button basic onClick={handleClose}>
                  Kembali
                </Button>
                <Button primary>
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
