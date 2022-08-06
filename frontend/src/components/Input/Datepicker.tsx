import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  value: Date | null;
  onChange: (value: Date | null) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  minDate?: Date;
};

export default function Datepicker({
  value,
  label,
  onChange,
  error,
  minDate,
  placeholder,
}: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <DatePicker
        selected={value}
        dateFormat="dd-MM-yyyy"
        onChange={onChange}
        minDate={minDate}
        className="border px-3 outline-none rounded flex flex-row items-center space-x-2 py-2  bg-gray-100 focus:border-blue-500 focus:bg-white w-full"
        placeholderText={placeholder}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
