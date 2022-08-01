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

type Props = {};

interface Values {
  q: string;
}

export default function History({ }: Props) {
  const { setIsLoading, setUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState<LoanPagination>();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<Values>();
  const watchQ = watch('q');

  const columns: TableColumn<LoanType>[] = [
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex flex-col space-y-1">
          {row.is_returned === 0 && (
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
      name: "Status",
      cell: (row) =>
        row.is_returned === 1 ? (
          <span className="px-2 py-1 text-white text-xs bg-green-500 rounded">
            Dikembalikan
          </span>
        ) : moment().isAfter(row.return_date) ? (<span className="px-2 py-1 text-white text-xs bg-red-500 rounded">
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

  useEffect(() => {
    getData(currentPage, perPage);
  }, [currentPage, perPage]);
  return (
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
        <Button primary to="/admin/user/create">
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
  );
}