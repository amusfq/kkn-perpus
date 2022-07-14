import React, { useEffect } from "react";
import useStore from "../../../store/store";
import Button from "../../components/Button";

type Props = {};

export default function NotFound({}: Props) {
  const { setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <div className="px-4 md:px-12 flex items-center justify-center py-4 md:py-12">
      <div className="space-y-4">
        <img src="/404.svg" alt="" className="w-96" />
        <div>
          <h1 className="font-bold text-xl md:text-3xl text-blue-500 text-center">
            404 Not Found
          </h1>
          <p className="text-center">
            Halaman yang anda cari tidak dapat ditemukan!
          </p>
        </div>
        <div className="text-center">
          <Button primary to="/">
            Halaman Utama
          </Button>
        </div>
      </div>
    </div>
  );
}
