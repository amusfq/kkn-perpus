import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {};

interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export default function PopularBooks({}: Props) {
  const [data, setData] = useState<Book[]>([]);

  const getData = () => {
    axios
      .get("https://api.itbook.store/1.0/new")
      .then((res) => setData(res.data.books))
      .catch((err) => {
        console.log(err.response);
        toast.error("Gagal mengambil data buku baru", { theme: "colored" });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-4 md:px-12 py-4 md:py-12 space-y-4 bg-gray-100">
      <h3 className="text-2xl md:text-3xl font-bold">
        Buku yang paling sering dibaca
      </h3>
      <p className="text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
      <div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {data.map((book, idx) => (
            <SwiperSlide key={idx}>
              <div className="text-center">
                <img
                  src={book.image}
                  alt=""
                  className="h-full w-auto mx-auto object-scale-down object-center"
                />
                <p className="font-medium">{book.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
