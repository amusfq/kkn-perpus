import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

type Props = {};

export default function Category({}: Props) {
  const data = [
    {
      name: "Seni",
      image: "/icons/art.png",
    },
    {
      name: "Jual Beli",
      image: "/icons/bookstore.png",
    },
    {
      name: "Pendidikan",
      image: "/icons/education.png",
    },
    {
      name: "Otomotif",
      image: "/icons/engineering.png",
    },
    {
      name: "Makanan",
      image: "/icons/food.png",
    },
    {
      name: "Humor",
      image: "/icons/humor.png",
    },
    {
      name: "Hukum",
      image: "/icons/law.png",
    },
    {
      name: "Politik",
      image: "/icons/politic.png",
    },
    {
      name: "Sosial",
      image: "/icons/social.png",
    },
  ];

  return (
    <div className="px-4 md:px-12 space-y-4">
      <h3 className="text-2xl md:text-3xl font-bold">Kategori</h3>
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
          {data.map((category, idx) => (
            <SwiperSlide key={idx}>
              <button className="text-center space-y-2">
                <img
                  src={category.image}
                  alt=""
                  className="h-16 md:h-24 w-auto aspect-square mx-auto"
                />
                <p className="font-bold text-xl">{category.name}</p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
