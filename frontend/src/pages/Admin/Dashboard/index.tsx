import { useEffect, useState } from "react";
import useStore from "../../../../store/store";
import numeral from "numeral";
import classNames from "../../../../Utils/classNames";
import Axios from "../../../api";
import { toast } from "react-toastify";
import Chart from "./Chart";
import BookType from "../../../models/BookType";
import PopularBook from "./PopularBook";

type Props = {};

interface DashboardType {
  books: number;
  authors: number;
  publishers: number;
  categories: number;
  loans: number;
  popular_books: BookType[]
}

export default function Dashboard({ }: Props) {
  const { setIsLoading } = useStore();
  const [data, setData] = useState<DashboardType>({
    books: 0,
    authors: 0,
    publishers: 0,
    categories: 0,
    loans: 0,
    popular_books: []
  });

  const getData = () => {
    setIsLoading(true);
    Axios.get("/dashboard")
      .then((res) => {
        const response = res.data;
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        toast.error("Gagal mengambil data dashboard", { theme: "colored" });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='space-y-8'>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card
          label="Total buku"
          count={data.books}
          color="border-blue-500"
          icon="fa-book"
        />
        <Card
          label="Total Penulis"
          count={data.authors}
          color="border-red-500"
          icon="fa-pen-fancy"
        />
        <Card
          label="Total Penerbit"
          count={data.publishers}
          color="border-green-500"
          icon="fa-print"
        />
        <Card
          label="Total Kategori"
          count={data.categories}
          color="border-orange-500"
          icon="fa-folder-tree"
        />
        <Card
          label="Buku Dipinjam"
          count={data.loans}
          color="border-purple-500"
          icon="fa-hands"
        />
      </div>
      <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>

        <div className="w-full md:w-2/3 border shadow rounded-md p-4 space-y-2">
          <h1 className="text-center font-medium ">Buku Populer</h1>
          <PopularBook data={data.popular_books} />
        </div>
        <div className="w-full md:w-1/3 border shadow rounded-md p-4">
          <h1 className="text-center font-medium ">Grafik Buku</h1>
          <Chart counts={[(data.books - data.loans), data.loans]} />
        </div>
      </div>
    </div>
  );
}

interface CardType {
  label: string;
  count: number;
  color: string;
  icon: string;
}

const Card = ({ label, count = 0, color = "", icon = "" }: CardType) => {
  return (
    <div
      className={classNames(
        "-z-10 shadow rounded-md bg-white px-3 py-2 space-y-2 border-b-4 relative",
        color
      )}
    >
      <i
        className={classNames(
          "-z-10 fa-solid text-gray-200 absolute top-1/2 -translate-y-1/2 right-4 text-4xl",
          icon
        )}
      ></i>
      <div className="">
        <h3 className="font-medium text-sm text-gray-500 z-10">{label}</h3>
        <h1 className="font-bold text-3xl z-10">{numeral(count).format("")}</h1>
      </div>
    </div>
  );
};
