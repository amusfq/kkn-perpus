import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../../../store/store";
import isTokenException from "../../../Utils/isTokenException";
import logout from "../../../Utils/logout";
import Axios from "../../api";
import Category from "../../components/Page/Home/Category";
import Hero from "../../components/Page/Home/Hero";
import NewBooks from "../../components/Page/Home/NewBooks";
import PopularBooks from "../../components/Page/Home/PopularBooks";
import { BookPagination } from "../../models/BookType";

type Props = {};

export default function Home({}: Props) {
  const { setIsLoading, setUser } = useStore();
  const [data, setData] = useState<BookPagination>();
  const navigate = useNavigate();

  const getData = () => {
    setIsLoading(true);
    Axios.get("/book")
      .then((res) => {
        const response = res.data;
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        const errors: string[] = Object.values(response.data.errors);
        if (isTokenException(errors)) return logout(setUser, navigate);
        toast.error("Gagal mengambil data buku baru", { theme: "colored" });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="space-y-32">
      <Hero />
      <Category />
      <NewBooks data={data} />
      <PopularBooks />
    </div>
  );
}
