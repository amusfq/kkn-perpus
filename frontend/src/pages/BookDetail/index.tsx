import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../../../store/store";
import Axios from "../../api";
import BookType from "../../models/BookType";
import { Helmet } from "react-helmet";
import Book from "../../components/Book";
import isTokenException from "../../../Utils/isTokenException";
import logout from "../../../Utils/logout";

type Props = {};

export default function BookDetail({ }: Props) {
  const { setIsLoading, setUser } = useStore();
  const [data, setData] = useState<BookType>();
  const navigate = useNavigate();
  const { slug } = useParams();

  const getData = (id: string) => {
    Axios.get(`/book/${id}`)
      .then((res) => {
        const response = res.data;
        Axios.get(`/book/view/${response.data.id}`);
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        const errors: string[] = Object.values(response.data.errors);
        if (isTokenException(errors)) return logout(setUser, navigate);
        toast.error("Gagal mengambil data buku", { theme: "colored" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (slug) getData(slug);
  }, [slug]);
  return (
    <>
      <Helmet>
        <title>{`${data?.title} - Perpustakaan Online`}</title>
      </Helmet>
      <div className="px-4 md:px-12 mt-24 space-y-8">
        <div>
          <button
            className="outline-none flex flex-row items-center space-x-2 font-bold md:text-xl hover:text-blue-500"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-angle-left"></i>
            <p>Kembali</p>
          </button>
        </div>
        <div className="max-w-4xl mx-auto pb-12">
          <div className="flex flex-row space-x-8">
            <div className="w-1/3">
              {data && <Book data={data} hideTitle />}
            </div>
            <div className="w-2/3 py-2 space-y-6">
              <div>
                <p className="text-gray-500">{data?.author.fullname}</p>
                <h1 className="md:text-2xl">{data?.title}</h1>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 font-medium text-sm">
                      Jumlah Halaman
                    </p>
                    <p>{data ? data.pages : '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-sm">
                      Penerbit
                    </p>
                    <p>{data?.publisher.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-sm">
                      Tahun Terbit
                    </p>
                    <p>
                      {data
                        ? data.published_date
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-sm">
                      Kode Buku
                    </p>
                    <p>{data?.code}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-sm">Bahasa</p>
                    <p>{data?.language.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-sm">Dilihat</p>
                    <p>{data?.views_count}x</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
