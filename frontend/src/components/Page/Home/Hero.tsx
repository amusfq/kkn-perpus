import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../../api";
import BookType from "../../../models/BookType";

type Props = {};

export default function Hero({}: Props) {
  const [data, setData] = useState<BookType>();

  const getData = () => {
    Axios.get("/book/random")
      .then((res) => {
        const response = res.data;
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        toast.error("Gagal mengambil data buku baru", { theme: "colored" });
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="px-4 md:px-12 flex flex-col md:flex-row md:space-x-12 mt-24">
      <div className="w-full md:w-7/12 py-12 flex items-center">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl md:text-5xl">
            Sistem informasi perpustakaan digital
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            fugiat rem eius quas perferendis, tenetur suscipit hic sint id
          </p>
          <div className="flex flex-row items-center">
            <input
              className="outline-none border border-gray-400 rounded-l h-12 px-4"
              placeholder="Cari buku"
            />
            <button className="bg-blue-600 hover:bg-blue-700 h-12 px-2 py-1 text-white rounded-r w-16 outline-none">
              <i className="fa-solid fa-magnifying-glass text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-5/12 px-8 md:px-0">
        {data && (
          <div className="relative">
            <div className="book-cover" />
            <img
              src={data.cover}
              alt={data.title}
              className="h-[30rem] w-auto object-cover object-center -z-[1] border"
              onError={(target: any) => {
                target.currentTarget.onerror = null;
                target.currentTarget.src = "/no-cover.jpg";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
