import { default as ReactSelect } from "react-select";

type Props = {
  options: { value: Number; label: String }[];
  label?: string;
  onChange: (value: Number) => void;
  error?: string;
  placeholder?: string;
  value?: Number;
};

export default function Select({
  options,
  label,
  onChange,
  error,
  placeholder,
  value,
}: Props) {
  const handleChange = (e: any) => {
    onChange(e.value);
  };
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <ReactSelect
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        value={value && options.find((e) => e.value === value) || []}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
