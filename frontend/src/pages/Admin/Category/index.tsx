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
  const { setIsLoading, setUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState<CategoryPagination>();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Values>();

  const columns: TableColumn<CategoryType>[] = [
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex flex-col space-y-1">
          <Link
            to={`/category/${row.slug}`}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
          >
            <p className="space-x-1">
              <i className="fa-solid fa-eye"></i>
              <span>Lihat</span>
            </p>
          </Link>
          <Link
            to={`/admin/category/${row.slug}`}
            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs"
          >
            <p className="space-x-1">
              <i className="fa-solid fa-pencil"></i>
              <span>Ubah</span>
            </p>
          </Link>
          <button
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
            onClick={updateStatus(row)}
          >
            <p className="space-x-1">
              <i className="fa-solid fa-trash"></i>
              <span>Hapus</span>
            </p>
          </button>
        </div>
      ),
      center: true,
      width: "8rem",
    },
    {
      name: "Icon",
      cell: (row) => (
        <img src={row.icon} alt="" className="h-14 w-auto mx-auto" />
      ),
      center: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.name,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
  ];

  const updateStatus = (row: CategoryType) => () => {
    Swal.fire({
      title: `Anda yakin ingin menghapus kategori ${row.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((response) => {
      if (response.isConfirmed) {
        setIsLoading(true);
        Axios.delete(`/category/${row.id}`)
          .then(async () => {
            toast.success(
              `Berhasil menghapus kategori ${row.name}`,
              { theme: "colored" }
            );
            await getData(currentPage, perPage);
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

  const getData = (
    page: number,
    perRow: number,
    q: string | undefined = ""
  ) => {
    setIsLoading(true);
    Axios.get("/category", {
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
        const temp: string[] = Object.values(response.data.errors);
        if (temp.includes("Token is expired")) return logout(setUser, navigate);
        temp.forEach((error: string) =>
          toast.error(error, { theme: "colored" })
        );
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
        <Button primary to="/admin/category/create">
          Tambah
        </Button>
      </div>
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
      </div>
    </div>
  );
}
