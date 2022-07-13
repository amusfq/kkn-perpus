import { BookPagination } from "../../../models/BookType";

type Props = {
  data?: BookPagination;
};

export default function Hero({ data }: Props) {
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
      <div className="w-full md:w-5/12">
        {data && data.data.length > 0 && (
          <img
            src={data.data[0].cover}
            alt=""
            className="aspect-square w-full object-scale-down object-center"
          />
        )}
      </div>
    </div>
  );
}
