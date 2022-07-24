import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useStore from "../../../../store/store";
import Axios from "../../../api";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import UserType, { UserPagination } from "../../../models/UserType";
import logout from "./../../../../Utils/logout";

type Props = {};

interface Values {
  q: string;
}

export default function User({}: Props) {
  const { setIsLoading, setUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<UserPagination>();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Values>();

  const columns: TableColumn<UserType>[] = [
    {
      name: "Aksi",
      cell: (row) => (
        <div className="space-x-2">
          {row.status === 1 && (
            <button
              className="px-2 py-1 bg-red-500 text-white rounded text-xs"
              onClick={updateStatus(row, "inactive")}
            >
              <i className="fa-solid fa-ban"></i>
            </button>
          )}
          {row.status === 0 && (
            <button
              className="px-2 py-1 bg-green-500 text-white rounded text-xs"
              onClick={updateStatus(row, "active")}
            >
              <i className="fa-solid fa-check"></i>
            </button>
          )}
          <button
            className="px-2 py-1 bg-red-500 text-white rounded text-xs"
            onClick={updateStatus(row, "delete")}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
    {
      name: "ID",
      width: "3rem",
      selector: (row) => row.id,
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
    },
  ];

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
            await getData(currentPage);
          })
          .catch((err) => {
            const response = err.response;
            console.log(response);
            response.data.errors.forEach((error: string) =>
              toast.error(error, { theme: "colored" })
            );
            if (response.data.errors.includes("Token is expired"))
              logout(setUser, navigate);
          })
          .finally(() => setIsLoading(false));
      }
    });
  };

  const getData = (page: number, q: string | undefined = "") => {
    setIsLoading(true);
    Axios.get("/user", {
      params: {
        page: page,
        q: q,
      },
    })
      .then((res) => {
        const response = res.data;
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        response.data.errors.forEach((error: string) =>
          toast.error(error, { theme: "colored" })
        );
        if (response.data.errors.includes("Token is expired"))
          logout(setUser, navigate);
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (data: Values) => {
    getData(1, data.q);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);
  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row space-x-2 items-center"
      >
        <Input placeholder="Cari.." {...register("q")} />
        <button className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">
          <i className="fa-solid fa-search"></i>
        </button>
      </form>
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
        />
      </div>
    </div>
  );
}
