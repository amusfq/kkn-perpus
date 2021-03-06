import { forwardRef, InputHTMLAttributes } from "react";
import classNames from "./../../../Utils/classNames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  className?: string;
  icon?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      containerClassName = "",
      className = "",
      icon = "",
      placeholder = "",
      error,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={classNames("space-y-1 group relative ", containerClassName)}
      >
        {label && <label className="text-sm font-medium">{label}</label>}
        <div
          className={classNames(
            "border px-3 rounded flex flex-row items-center space-x-2 bg-gray-100 group focus-within:border-blue-500 focus-within:bg-white"
          )}
        >
          {icon && <i className={classNames("text-gray-400", icon)}></i>}
          <input
            ref={ref}
            className={classNames(
              "outline-none bg-gray-100 focus:bg-white py-2 w-full",
              disabled ? "cursor-not-allowed" : "",
              className
            )}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Input;
