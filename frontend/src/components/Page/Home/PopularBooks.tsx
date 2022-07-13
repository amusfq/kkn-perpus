import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../../api";
import { BookPagination } from "../../../models/BookType";

type Props = {};

export default function PopularBooks({}: Props) {
  const [data, setData] = useState<BookPagination>();

  const getData = () => {
    Axios.get("/book/views")
      .then((res) => {
        const response = res.data;
        setData(response.data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        toast.error("Gagal mengambil data buku popular", { theme: "colored" });
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
        {data && (
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
          >
            {data.data.map((book) => (
              <SwiperSlide key={book.id}>
                <div className="text-center space-y-2">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-full w-auto mx-auto object-scale-down object-center"
                  />
                  <p className="font-medium md:text-xl">{book.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
