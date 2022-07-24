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
import InputImage from "../../../components/Input/InputImage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {};

interface Values {
  icon: File;
  name: String;
}

const schema = yup
  .object()
  .shape({
    icon: yup
      .mixed()
      .test(
        "fileType",
        "Format gambar hanya .jpeg, .jpg atau .png",
        (value) => {
          if (typeof value === "string" || !value) return true;
          return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
        }
      )
      .test("fileSize", "Gambar maksimal 2MB", (value) => {
        if (typeof value === "string" || !value) return true;
        return value.size <= 2000000;
      }),
    name: yup.string().required("Kategori tidak boleh kosong"),
  })
  .required();

export default function CreateUpdateCategory({}: Props) {
  const { setIsLoading, setUser } = useStore();
  const { slug } = useParams();
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    watch,
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const getData = async (slug?: string) => {
    setIsLoading(true);
    await Axios.get(`/category/${slug}`)
      .then((res) => {
        const data = res.data.data;
        reset(data);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        toast.error("Gagal mengambil data buku", { theme: "colored" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = (data: any) => {
    let temp = { ...data };
    const formData = new FormData();

    setIsLoading(true);
    if (slug) {
      if (typeof temp.icon === "string") delete temp.icon;
      for (let key in temp) formData.append(key, temp[key]);
      Axios.post(`/category/${temp.id}?_method=PUT`, formData)
        .then(() => {
          Swal.fire({
            title: "Kategori berhasil diubah",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#3b82f6",
          }).then((response) => navigate(-1));
        })
        .catch((err) => {
          const response = err.response;
          window.scrollTo(0, 0);
          console.log(response);
          const temp: string[] = Object.values(response.data.errors);
          if (temp.includes("Token is expired"))
            return logout(setUser, navigate);
          setSubmitErrors(temp);
          return [];
        })
        .finally(() => setIsLoading(false));
    } else {
      for (let key in temp) formData.append(key, temp[key]);
      Axios.post("/category", formData)
        .then(() => {
          Swal.fire({
            title: "Kategori berhasil diinput",
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
          const temp: string[] = Object.values(response.data.errors);
          if (temp.includes("Token is expired"))
            return logout(setUser, navigate);
          setSubmitErrors(temp);
          return [];
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (slug) {
      getData(slug);
    } else {
      setIsLoading(false);
    }
  }, [slug]);

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
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-full md:w-48 md:h-48 h-full">
              <InputImage
                label="Gambar"
                onChange={(e) => setValue("icon", e)}
                value={watch("icon")}
                name="icon"
                error={errors.icon?.message}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <Input
              label="Kategori"
              {...register("name")}
              error={errors.name?.message}
            />
            <div className="col-span-2 flex justify-end">
              <Button primary>Simpan</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
