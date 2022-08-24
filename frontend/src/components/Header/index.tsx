import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "../../api";
import useStore from "../../../store/store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

interface Values {
  username: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    username: yup.string().required("Username tidak boleh kosong"),
    password: yup.string().required("Password tidak boleh kosong"),
  })
  .required();

export default function Header({}: Props) {
  const { setIsLoading, user, setUser } = useStore();
  const [open, setOpen] = useState(false);
  const [responsesError, setResponsesError] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Values) => {
    setIsLoading(true);
    setResponsesError([]);
    Axios.post("/login", data)
      .then((res: any) => {
        const response = res.data;
        setUser(response.data.user);
        Cookies.set(
          "token",
          `${response.data.authorisation.type} ${response.data.authorisation.token}`
        );
        toast.success(`Selamat datang, ${response.data.user.fullname}`, {
          theme: "colored",
        });
        setOpen(false);
        navigate("/admin");
      })
      .catch((err) => {
        const response = err.response;
        console.log(response.data);
        setResponsesError(response.data.errors);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(undefined);
    toast.success("Berhasil keluar", { theme: "colored" });
    navigate("/");
  };

  return (
    <>
      <div className="px-4 md:px-12 py-2 h-16 flex flex-row items-center justify-between fixed top-0 left-0 right-0 bg-white z-40 border-b shadow">
        <div className="w-auto h-full">
          <Link to="/">
            <img src="/logo.png" alt="" className="h-full w-auto" />
          </Link>
        </div>
        {user ? (
          <div className="flex flex-row space-x-4 items-center">
            <Button to="/admin" primary>
              Dashboard
            </Button>
            <div className="relative group">
              <div className="flex flex-row items-center space-x-2">
                <p>{user.fullname}</p>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              <div className="absolute top-full right-0 border bg-white shadow w-36 hidden group-hover:block rounded overflow-hidden">
                <Link
                  to="/admin/profile"
                  className="px-3 py-1 block hover:text-white hover:bg-blue-500"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 w-full text-left hover:text-white hover:bg-blue-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white"
            onClick={() => setOpen(true)}
          >
            Login
          </button>
        )}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 pb-12"
        >
          <div className="pb-4">
            <img
              src="/logo.png"
              alt=""
              className="h-40 w-40 aspect-square mx-auto rounded"
            />
          </div>
          {responsesError.length > 0 && (
            <div className="px-3 py-2 bg-red-500 text-white rounded flex flex-row space-x-2">
              <i className="fa-solid fa-triangle-exclamation pt-1"></i>
              <div>
                {responsesError.map((error, idx) => (
                  <p key={idx}>{error}</p>
                ))}
              </div>
            </div>
          )}
          <Input
            label="Username"
            icon="fa-solid fa-circle-user"
            {...register("username")}
            error={errors.username?.message}
          />
          <Input
            label="Password"
            icon="fa-solid fa-key"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button primary block circle>
            Masuk
          </Button>
        </form>
      </Modal>
    </>
  );
}
