import { useEffect, useState } from "react";

type Props = {
  name: string;
  onChange: (e: File) => void;
  value: any;
  label?: string;
  error?: string;
};

export default function InputImage({
  name,
  label,
  onChange,
  value,
  error,
}: Props) {
  const [selected, setSelected] = useState<{
    file?: File;
    preview: any;
  }>({ file: undefined, preview: null });

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelected({ file, preview: reader.result });
      onChange(file);
    };
  };

  const removeSelected = () => {
    setSelected({ file: undefined, preview: null });
  };

  useEffect(() => {
    if (!value) setSelected({ file: undefined, preview: null });
    if (typeof value === "string")
      setSelected({ file: undefined, preview: value });
  }, [value]);

  return (
    <div className="space-y-1 relative w-full h-full">
      {label && <p className="text-sm font-medium">{label}</p>}
      {!selected.preview && (
        <label
          htmlFor={name}
          className="cursor-pointer rounded bg-gray-200 border hover:bg-gray-300 text-white h-full w-full aspect-square text-6xl flex items-center justify-center"
        >
          <i className="fa-solid fa-plus"></i>
        </label>
      )}
      {selected.preview && (
        <div className="relative h-full w-full rounded overflow-hidden group">
          <button
            onClick={removeSelected}
            className="absolute inset-0 outline-none text-white h-full w-full text-3xl flex items-center justify-center group-hover:bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <img
            src={selected.preview}
            className="h-full w-full object-scale-down object-center"
            alt=""
          />
        </div>
      )}
      <input
        id={name}
        name={name}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
