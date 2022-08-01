import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../../../store/store";
import Axios from "../../api";
import { BookPagination } from "../../models/BookType";
import CategoryType from "../../models/CategoryType";
import { Helmet } from "react-helmet";
import Book from "../../components/Book";
import isTokenException from "../../../Utils/isTokenException";
import logout from "../../../Utils/logout";

type Props = {};

export default function BookBySlug({}: Props) {
  let { slug } = useParams();
  const navigate = useNavigate();
  const { setIsLoading, setUser } = useStore();
  const [category, setCategory] = useState<CategoryType>();
  const [data, setData] = useState<BookPagination>();

  const getData = (id: string) => {
    setIsLoading(true);
    Axios.get(`/category/${id}`)
      .then((res) => {
        const response = res.data;
        setCategory(response.data);
        Axios.get(`/book`, {
          params: {
            category_id: response.data.id,
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
            toast.error(
              `Gagal mengambil data buku kategori ${response.data.name}`,
              {
                theme: "colored",
              }
            );
          })
          .finally(() => setIsLoading(false));
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        toast.error(`Gagal mengambil data kategori ${id}`, {
          theme: "colored",
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (slug) getData(slug);
  }, [slug]);
  return (
    <>
      <Helmet>
        <title>{`Kategori ${category?.name} - Perpustakaan Online`}</title>
      </Helmet>
      <div className="px-4 md:px-12 mt-24 space-y-8">
        <div>
          <button
            className="outline-none flex flex-row items-center space-x-2 font-bold md:text-xl hover:text-blue-500"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-angle-left"></i>
            <p>Kategori Buku {category?.name}</p>
          </button>
        </div>
        {data && data.data.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 items-start">
            {data.data.map((book) => (
              <Book key={book.id} data={book} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-6 md:py-12">
            <div className="w-72">
              <img src="/no-data.svg" alt="" />
              <h1 className="text-center font-medium text-xl">
                Oops, sepertinya belum ada buku untuk kategori "{category?.name}
                "
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
