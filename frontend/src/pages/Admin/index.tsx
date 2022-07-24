import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import useStore from "../../../store/store";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { isExpired } from "react-jwt";

type Props = {
  title: string;
  children: ReactNode;
};

export default function AdminLayout({ title = "", children }: Props) {
  const { setUser } = useStore();
  const token = Cookies.get("token");
  let location = useLocation();
  if (!token) {
    setUser(undefined);
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    if (isExpired(token)) {
      Cookies.remove("token");
      setUser(undefined);
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return (
    <>
      <Helmet>
        <title>{`${title} - Perpustakaan Online`}</title>
      </Helmet>
      <div>
        <div className="bg-blue-50 px-12 py-6">
          <h1 className="font-bold text-xl text-blue-700">{title}</h1>
        </div>
        <div className="px-4 md:px-12 py-4 space-y-4 md:space-y-0 flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-3/12">
            <Sidebar />
          </div>
          <div className="w-full md:w-9/12 border rounded p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
