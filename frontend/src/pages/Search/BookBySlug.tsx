import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../../../store/store";
import Axios from "../../api";
import { BookPagination } from "../../models/BookType";
import CategoryType from "../../models/CategoryType";

type Props = {};

export default function BookBySlug({}: Props) {
  let { slug } = useParams();
  const navigate = useNavigate();
  const { setIsLoading } = useStore();
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
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
          {data.data.map((book) => (
            <div className="text-center space-y-2" key={book.id}>
              <div className="relative">
                <div className="book-cover" />
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-44 md:h-full w-full object-scale-down object-center border -z-[1]"
                  onError={(target: any) => {
                    target.currentTarget.onerror = null;
                    target.currentTarget.src = "/no-cover.jpg";
                  }}
                />
              </div>
              <div>
                <p className="text-center  text-gray-500">
                  {book.author.fullname}
                </p>
                <p className="font-medium">{book.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "Buku tidak ditemukan"
      )}
    </div>
  );
}
