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
import UserType, { UserPagination } from "../../../models/UserType";
import logout from "./../../../../Utils/logout";
import isTokenException from "./../../../../Utils/isTokenException";

type Props = {};

interface Values {
  q: string;
}

export default function User({}: Props) {
  const { setIsLoading, setUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState<UserPagination>();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<Values>();
  const watchQ = watch('q')

  const columns: TableColumn<UserType>[] = [
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex flex-col space-y-1">
          <Link
            to={`/admin/user/${row.id}`}
            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs text-center"
          >
            <p className="space-x-1">
              <i className="fa-solid fa-pencil"></i>
              <span>Ubah</span>
            </p>
          </Link>
          {row.status === 1 && (
            <button
              className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs text-center"
              onClick={updateStatus(row, "inactive")}
            >
              <p className="space-x-1">
                <i className="fa-solid fa-ban"></i>
                <span>Nonaktif</span>
              </p>
            </button>
          )}
          {row.status === 0 && (
            <button
              className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs text-center"
              onClick={updateStatus(row, "active")}
            >
              <p className="space-x-1">
                <i className="fa-solid fa-check"></i>
                <span>Aktifkan</span>
              </p>
            </button>
          )}
          <button
            className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs text-center"
            onClick={resetPassword(row)}
          >
            <p className="space-x-1">
              <i className="fa-solid fa-key"></i>
              <span>Reset Password</span>
            </p>
          </button>
          <button
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
            onClick={updateStatus(row, "delete")}
          >
            <p className="space-x-1">
              <i className="fa-solid fa-trash"></i>
              <span>Hapus</span>
            </p>
          </button>
        </div>
      ),
      width: "10rem",
      center: true,
    },
    {
      name: "Nama Lengkap",
      selector: (row) => row.fullname,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Status",
      cell: (row) =>
        row.status === 1 ? (
          <span className="px-2 py-1 text-white text-xs bg-green-500 rounded">
            Aktif
          </span>
        ) : (
          <span className="px-2 py-1 text-white text-xs bg-red-500 rounded">
            Non Aktif
          </span>
        ),
      center: true,
    },
  ];

  const resetPassword = (row: UserType) => () => {
    Swal.fire({
      title: `Anda yakin ingin mereset password ${row.fullname}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((response) => {
      if (response.isConfirmed) {
        setIsLoading(true);
        Axios.put(`/user/reset-password/${row.id}`)
          .then((res) => {
            const response = res.data;
            Swal.fire({
              title: "Password berhasil direset",
              html: `Password baru adalah <b>${response.data}</b>`,
              icon: "success",
            });
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

  const updateStatus = (row: UserType, status: string) => () => {
    Swal.fire({
      title: `Anda yakin ingin ${
        status === "active"
          ? "mengaktifkan"
          : status === "delete"
          ? "menghapus"
          : "menonaktifkan"
      } user ini?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((response) => {
      if (response.isConfirmed) {
        setIsLoading(true);
        Axios.post("/user/status", {
          user_id: row.id,
          status: status,
        })
          .then(async () => {
            toast.success(
              `Berhasil ${
                status === "active"
                  ? "mengaktifkan"
                  : status === "delete"
                  ? "menghapus"
                  : "menonaktifkan"
              } user`,
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
    Axios.get("/user", {
      params: {
        page: page,
        q: q,
        per_page: perRow
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
