import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useStore from "../../../../store/store";
import Axios from "../../../api";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import BookType from "../../../models/BookType";
import logout from "../../../../Utils/logout";
import InputImage from "../../../components/Input/InputImage";
import Select from "../../../components/Select";
import { AuthorPagination } from "../../../models/AuthorType";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PublisherPagination } from "../../../models/PublisherType";
import Datepicker from "../../../components/Input/Datepicker";
import { LanguagePagination } from "../../../models/LanguageType";
import { CategoryPagination } from "../../../models/CategoryType";
import { ShelfPagination } from "../../../models/ShelfType";
import Textarea from "../../../components/Input/Textarea";
import moment from "moment";

type Props = {};

interface Values {
  cover: File;
  title: String;
  author_id: Number;
  publisher_id: Number;
  published_date: Date | null;
  quantity: Number;
  code: String;
  slug: String;
  description: String;
  pages: Number;
  language_id: Number;
  shelf_id: Number;
  category_id: Number;
}

const schema = yup
  .object()
  .shape({
    cover: yup
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
    title: yup.string().required("Judul buku tidak boleh kosong"),
    author_id: yup.number().required("Penulis buku tidak boleh kosong"),
    publisher_id: yup.number().required("Penerbit buku tidak boleh kosong"),
    category_id: yup.number().required("Kategori buku tidak boleh kosong"),
    language_id: yup.number().required("Bahasa buku tidak boleh kosong"),
    shelf_id: yup.number().required("Rak buku tidak boleh kosong"),
    published_date: yup
      .date()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .required("Tanggal terbit buku tidak boleh kosong"),
    quantity: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(1, "Jumlah buku minimal 1")
      .required("Jumlah buku tidak boleh kosong"),
    code: yup.string().required("Kode buku tidak boleh kosong"),
    pages: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(1, "Halaman buku minimal 1")
      .required("Halaman buku tidak boleh kosong"),
    description: yup.string().required("Deskripsi buku tidak boleh kosong"),
  })
  .required();

export default function CreateUpdateBook({}: Props) {
  const { isLoading, setIsLoading, setUser } = useStore();
  const [data, setData] = useState<BookType>();
  const { slug } = useParams();
  const [authors, setAuthors] = useState<AuthorPagination>();
  const [publishers, setPublishers] = useState<PublisherPagination>();
  const [languages, setLanguages] = useState<LanguagePagination>();
  const [categories, setCategories] = useState<CategoryPagination>();
  const [shelve, setShelve] = useState<ShelfPagination>();
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

  const getSelect = (url: string) => {
    setIsLoading(true);
    return Axios.get(url, {
      params: {
        per_page: 9999,
      },
    })
      .then((res) => {
        const response = res.data;
        return response.data;
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        const temp: string[] = Object.values(response.data.errors);
        if (temp.includes("Token is expired")) logout(setUser, navigate);
        temp.forEach((error: string) =>
          toast.error(error, { theme: "colored" })
        );
        return [];
      })
      .finally(() => setIsLoading(false));
  };

  const getBook = async (slug: string) => {
    await Axios.get(`/book/${slug}`)
      .then((res) => {
        const book = res.data.data;
        book.author_id = book.author.id;
        book.publisher_id = book.publisher.id;
        book.category_id = book.category.id;
        book.language_id = book.language.id;
        book.shelf_id = book.shelf.id;
        book.published_date = new Date(book.published_date);
        reset(book);
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

  const getData = async (slug?: string) => {
    setIsLoading(true);
    if (slug) await getBook(slug);
    setAuthors(await getSelect("/author"));
    setPublishers(await getSelect("/publisher"));
    setCategories(await getSelect("/category"));
    setLanguages(await getSelect("/language"));
    setShelve(await getSelect("/shelf"));
  };

  const onSubmit = (data: any) => {
    let temp = { ...data };
    temp.published_date = moment(temp.published_date).format("YYYY-MM-DD");
    const formData = new FormData();

    setIsLoading(true);
    if (slug) {
      if (typeof temp.cover === "string") delete temp.cover;
      for (let key in temp) formData.append(key, temp[key]);
      Axios.post(`/book/${temp.id}?_method=PUT`, formData)
        .then(() => {
          Swal.fire({
            title: "Buku berhasil diubah",
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
      Axios.post("/book", formData)
        .then(() => {
          Swal.fire({
            title: "Buku berhasil diinput",
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
    getData(slug);
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
        <div className="flex justify-center pb-8">
          <div className='w-32 h-48'>
            <InputImage
              label="Gambar Buku"
              onChange={(e) => setValue("cover", e)}
              value={watch("cover")}
              name="cover"
              error={errors.cover?.message}
            />
          </div>
        </div>
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
        <Input
          label="Judul Buku"
          {...register("title")}
          error={errors.title?.message}
        />
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <Select
              label="Penulis"
              options={
                authors?.data.map((item) => ({
                  value: item.id,
                  label: item.fullname,
                })) || []
              }
              onChange={(e) => setValue("author_id", e)}
              error={errors.author_id?.message}
              placeholder="Pilih.."
              value={watch("author_id")}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Select
              label="Penerbit"
              options={
                publishers?.data.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              onChange={(e) => setValue("publisher_id", e)}
              error={errors.publisher_id?.message}
              placeholder="Pilih.."
              value={watch("publisher_id")}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <Select
              label="Kategori"
              options={
                categories?.data.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              onChange={(e) => setValue("category_id", e)}
              error={errors.category_id?.message}
              placeholder="Pilih.."
              value={watch("category_id")}
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select
              label="Bahasa"
              options={
                languages?.data.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              onChange={(e) => setValue("language_id", e)}
              error={errors.language_id?.message}
              placeholder="Pilih.."
              value={watch("language_id")}
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select
              label="Rak"
              options={
                shelve?.data.map((item) => ({
                  value: item.id,
                  label: `${item.location} - ${item.name}`,
                })) || []
              }
              onChange={(e) => setValue("shelf_id", e)}
              error={errors.shelf_id?.message}
              placeholder="Pilih.."
              value={watch("shelf_id")}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/4">
            <Datepicker
              label="Tanggal Terbit"
              placeholder=""
              onChange={(e) => setValue("published_date", e)}
              value={watch("published_date")}
              error={errors.published_date?.message}
            />
          </div>
          <div className="w-full md:w-1/4">
            <Input
              label="Jumlah Buku"
              {...register("quantity")}
              error={errors.quantity?.message}
              type="number"
              min={1}
            />
          </div>
          <div className="w-full md:w-1/4">
            <Input
              label="Kode Buku"
              {...register("code")}
              error={errors.code?.message}
            />
          </div>
          <div className="w-full md:w-1/4">
            <Input
              label="Jumlah Halaman"
              {...register("pages")}
              error={errors.pages?.message}
              type="number"
              min={1}
            />
          </div>
        </div>
        <Textarea label="Deskripsi" {...register("description")} rows={5} />
        <div className="col-span-2 flex justify-end">
          <Button primary>Simpan</Button>
        </div>
      </form>
    </div>
  );
}
