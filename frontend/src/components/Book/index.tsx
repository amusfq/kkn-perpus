import BookType from "../../models/BookType";
import classNames from "./../../../Utils/classNames";
import { Link } from "react-router-dom";

type Props = {
  data: BookType;
  className?: string;
  hideTitle?: boolean;
};

export default function Book({ data, className = "", hideTitle }: Props) {
  return (
    <Link
      to={`/book/${data.slug}`}
      className={classNames(
        "flex flex-col justify-center space-y-2",
        className
      )}
    >
      <div className="relative mx-auto">
        <div className="book-cover" />
        <img
          src={data.cover}
          alt={data.title}
          className={classNames(
            "w-auto object-cover object-center -z-[1] border h-full"
          )}
          onError={(target: any) => {
            target.currentTarget.onerror = null;
            target.currentTarget.src = "/no-cover.jpg";
          }}
        />
      </div>
      {!hideTitle && (
        <div>
          <p className="text-center  text-gray-500">{data.author.fullname}</p>
          <p className="text-center font-medium">{data.title}</p>
        </div>
      )}
    </Link>
  );
}
