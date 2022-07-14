import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../api";
import Category from "../../components/Page/Home/Category";
import Hero from "../../components/Page/Home/Hero";
import NewBooks from "../../components/Page/Home/NewBooks";
import PopularBooks from "../../components/Page/Home/PopularBooks";
import { BookPagination } from "../../models/BookType";

type Props = {};

export default function Home({}: Props) {
  const [data, setData] = useState<BookPagination>();

  const getData = () => {
    Axios.get("/book/recent")
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
    <div className="space-y-32 md:mt-16">
      <Hero />
      <Category />
      <NewBooks data={data} />
      <PopularBooks />
    </div>
  );
}
