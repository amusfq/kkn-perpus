import classNames from "./../../../Utils/classNames";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
  block?: boolean;
  circle?: boolean;
  to?: string;
};

export default function Button({
  children,
  className = "",
  primary,
  block,
  to,
  circle,
}: Props) {
  return to ? (
    <Link
      to={to}
      className={classNames(
        "min-w-[7rem] py-2 inline-block text-center px-3",
        primary ? "bg-blue-500 hover:bg-blue-600 text-white" : "",
        block ? "w-full" : "",
        circle ? "rounded-full" : "rounded",
        className
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      className={classNames(
        "min-w-[7rem] py-2 px-3",
        primary ? "bg-blue-500 hover:bg-blue-600 text-white" : "",
        block ? "w-full" : "",
        circle ? "rounded-full" : "rounded",
        className
      )}
    >
      {children}
    </button>
  );
}
