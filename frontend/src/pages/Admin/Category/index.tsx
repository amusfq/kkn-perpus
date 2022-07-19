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
import CategoryType, { CategoryPagination } from "../../../models/CategoryType";
import logout from "./../../../../Utils/logout";

type Props = {};

interface Values {
  q: string;
}

export default function Category({}: Props) {
  const { isLoading, setIsLoading, setUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<CategoryPagination>();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Values>();

  const columns: TableColumn<CategoryType>[] = [
    {
      name: "ID",
      width: "3rem",
      selector: (row) => row.id,
    },
    {
      name: "Icon",
      cell: (row) => (
        <img src={row.icon} alt="" className="h-14 w-auto mx-auto" />
      ),
    },
    {
      name: "Kategori",
      selector: (row) => row.name,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="space-x-2">
          <Link
            to={`/category/${row.slug}`}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
          <button
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
            // onClick={updateStatus(row, "delete")}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const updateStatus = (row: CategoryType, status: string) => () => {
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
    Axios.get("/category", {
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
          highlightOnHover
          persistTableHead
          pagination
          paginationServer
          paginationTotalRows={data?.total || 0}
          responsive
          striped
        />
      </div>
    </div>
  );
}
