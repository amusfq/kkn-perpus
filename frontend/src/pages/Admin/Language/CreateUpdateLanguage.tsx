import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useStore from "../../../../store/store";
import Axios from "../../../api";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import logout from "../../../../Utils/logout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import isTokenException from "../../../../Utils/isTokenException";

type Props = {};

interface Values {
  name: String;
  address: String;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Bahasa tidak boleh kosong"),
  })
  .required();

export default function CreateUpdateLanguage({}: Props) {
  const { setIsLoading, setUser } = useStore();
  const { id } = useParams();
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const getData = async (id?: string) => {
    setIsLoading(true);
    await Axios.get(`/language/${id}`)
      .then((res) => {
        const data = res.data.data;
        reset(data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        const errors: string[] = Object.values(response.data.errors);
        if (isTokenException(errors)) return logout(setUser, navigate);
        toast.error("Gagal mengambil data Bahasa  ", { theme: "colored" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = (data: any) => {
    setIsLoading(true);
    if (id) {
      Axios.put(`/language/${id}`, data)
        .then(() => {
          Swal.fire({
            title: "Bahasa berhasil diubah",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#3b82f6",
          }).then(() => navigate(-1));
        })
        .catch((err) => {
          const response = err.response;
          window.scrollTo(0, 0);
          console.log(response);
          const errors: string[] = Object.values(response.data.errors);
          if (isTokenException(errors)) return logout(setUser, navigate);
          setSubmitErrors(errors);
          return [];
        })
        .finally(() => setIsLoading(false));
    } else {
      Axios.post("/language", data)
        .then(() => {
          Swal.fire({
            title: "Bahasa berhasil diinput",
            icon: "success",
            showCancelButton: true,
            cancelButtonText: "Kembali",
            confirmButtonText: "Tambah lagi",
            confirmButtonColor: "#3b82f6",
          }).then((response) => {
            if (response.isConfirmed) {
              reset();
            } else {
              navigate(-1);
            }
          });
        })
        .catch((err) => {
          const response = err.response;
          window.scrollTo(0, 0);
          console.log(response);
          const errors: string[] = Object.values(response.data.errors);
          if (isTokenException(errors)) return logout(setUser, navigate);
          setSubmitErrors(errors);
          return [];
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (id) {
      getData(id);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  return (
    <div className="space-y-4">
      <button
        className="outline-none flex flex-row items-center space-x-2 font-bold md:text-xl hover:text-blue-500"
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-angle-left"></i>
        <p>Kembali</p>
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitErrors.length > 0 && (
          <div className="px-3 py-2 bg-red-500 text-white rounded flex flex-row space-x-2">
            <i className="fa-solid fa-triangle-exclamation pt-1"></i>
            <div>
              {submitErrors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Bahasa"
              {...register("name")}
              error={errors.name?.message}
            />
          <div className="md:col-span-2 flex justify-end">
            <Button primary>Simpan</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
