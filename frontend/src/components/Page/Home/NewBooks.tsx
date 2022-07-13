import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { BookPagination } from "../../../models/BookType";

type Props = {
  data?: BookPagination;
};

export default function NewBooks({ data }: Props) {
  return (
    <div className="px-4 md:px-12 flex flex-col md:flex-row md:space-x-24 space-y-8 md:space-y-0">
      <div className="w-full md:w-5/12 px-16 md:px-24 relative">
        {data && (
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            modules={[EffectCards, Autoplay]}
            effect="cards"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
          >
            {data.data.slice(0, 4).map((book) => (
              <SwiperSlide key={book.id}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full w-full object-cover object-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="w-full md:w-7/12 space-y-4">
        <h1 className="text-3xl font-bold">Buku terbaru</h1>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          distinctio dignissimos minima in
        </p>
        <div className="grid grid-cols-2 gap-4">
          {data &&
            data.data
              .slice(0, 4)
              .map((book) => (
                <img
                  key={book.id}
                  src={book.cover}
                  alt={book.title}
                  className="aspect-square w-full object-scale-down object-center"
                />
              ))}
        </div>
      </div>
    </div>
  );
}
