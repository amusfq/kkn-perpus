import { forwardRef, TextareaHTMLAttributes } from "react";
import classNames from "./../../../Utils/classNames";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
  className?: string;
  icon?: string;
  placeholder?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      label,
      containerClassName = "",
      className = "",
      icon = "",
      placeholder = "",
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={classNames("space-y-1 group", containerClassName)}>
        {label && <label className="text-sm font-medium">{label}</label>}
        <div className="border px-3 rounded flex flex-row items-center space-x-2 bg-gray-100 group focus-within:border-blue-500 focus-within:bg-white">
          {icon && <i className={classNames("text-gray-400", icon)}></i>}
          <textarea
            ref={ref}
            className={classNames(
              "outline-none bg-gray-100 focus:bg-white py-2 flex-grow",
              className
            )}
            placeholder={placeholder}
            {...rest}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Textarea;
