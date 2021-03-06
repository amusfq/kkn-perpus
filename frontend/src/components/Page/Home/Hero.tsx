import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../../../../store/store";
import Axios from "../../../api";
import BookType from "../../../models/BookType";
import Book from "../../Book";

type Props = {};

interface Values {
  q: string;
}

export default function Hero({}: Props) {
  const { setIsLoading } = useStore();
  const [data, setData] = useState<BookType>();
  const { register, handleSubmit } = useForm<Values>();
  const navigate = useNavigate();

  const getData = () => {
    setIsLoading(true);
    Axios.get("/book/random")
      .then((res) => {
        const response = res.data;
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        toast.error("Gagal mengambil data buku baru", { theme: "colored" });
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (data: Values) => {
    if (data.q) navigate(`/search?q=${data.q}`);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row items-center"
          >
            <input
              className="outline-none border border-gray-400 rounded-l h-12 px-4"
              placeholder="Cari buku"
              {...register("q")}
            />
            <button className="bg-blue-600 hover:bg-blue-700 h-12 px-2 py-1 text-white rounded-r w-16 outline-none">
              <i className="fa-solid fa-magnifying-glass text-xl"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-5/12 px-8 md:px-0">
        {data && <Book data={data} />}
      </div>
    </div>
  );
}
