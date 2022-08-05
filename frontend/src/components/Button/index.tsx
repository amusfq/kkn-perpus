import { ButtonHTMLAttributes } from 'react'
import classNames from "./../../../Utils/classNames";
import { Link } from "react-router-dom";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  basic?: boolean;
  primary?: boolean;
  block?: boolean;
  circle?: boolean;
  to?: string;
};

export default function Button({
  children,
  className = "",
  basic,
  primary,
  block,
  to,
  circle,
  ...rest
}: Props) {
  return to ? (
    <Link
      to={to}
      className={classNames(
        "min-w-[7rem] py-2 inline-block text-center px-3",
        basic ? "bg-gray-300 hover:bg-gray-400 text-white" : "",
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
        basic ? "bg-gray-300 hover:bg-gray-400 text-white" : "",
        primary ? "bg-blue-500 hover:bg-blue-600 text-white" : "",
        block ? "w-full" : "",
        circle ? "rounded-full" : "rounded",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
