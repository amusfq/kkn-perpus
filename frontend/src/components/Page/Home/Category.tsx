import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../../api";
import { CategoryPagination } from "../../../models/CategoryType";
import useStore from "../../../../store/store";
import { Link } from "react-router-dom";

type Props = {};

export default function Category({}: Props) {
  const { setIsLoading } = useStore();
  const [data, setData] = useState<CategoryPagination>();

  const getData = () => {
    setIsLoading(true);
    Axios.get("/category")
      .then((res) => {
        const response = res.data;
        setData(response);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        toast.error("Gagal mengambil data kategori", { theme: "colored" });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-4 md:px-12 space-y-4">
      <h3 className="text-2xl md:text-3xl font-bold">Kategori</h3>
      <div>
        {data && (
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
            {data.data.map((category) => (
              <SwiperSlide key={category.id}>
                <Link to={`/category/${category.slug}`} className="text-center space-y-2">
                  <img
                    src={category.icon}
                    alt=""
                    className="h-16 md:h-24 w-auto aspect-square mx-auto"
                  />
                  <p className="font-bold text-xl">{category.name}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
