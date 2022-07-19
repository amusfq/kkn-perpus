import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import classNames from "../../../Utils/classNames";

type Props = {};

type Menu = {
  icon: any;
  label: string;
  to: string;
};

export default function Sidebar({}: Props) {
  const menus: Menu[] = [
    {
      icon: "fa-solid fa-chart-line",
      label: "Dashboard",
      to: "/admin",
    },
    {
      icon: "fa-solid fa-clock-rotate-left",
      label: "Peminjaman",
      to: "/admin/history",
    },
    {
      icon: "fa-solid fa-user-tie",
      label: "Pengguna",
      to: "/admin/user",
    },
    {
      icon: "fa-solid fa-book",
      label: "Buku",
      to: "/admin/book",
    },
    {
      icon: "fa-solid fa-folder-tree",
      label: "Kategori",
      to: "/admin/category",
    },
    {
      icon: "fa-solid fa-user-pen",
      label: "Author",
      to: "/admin/author",
    },
    {
      icon: "fa-solid fa-print",
      label: "Publisher",
      to: "/admin/publisher",
    },
  ];

  return (
    <div className="border border-blue-500 rounded-md overflow-hidden">
      <SimpleBar>
        <div className="flex flex-row md:flex-col rounded-md md:divide-y md:divide-blue-500">
          {menus.map((menu, idx) => (
            <SidebarItem key={idx} data={menu} />
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}

type SidebarItemType = {
  data: Menu;
};

const SidebarItem = ({ data }: SidebarItemType) => {
  const location = useLocation();
  return (
    <Link
      to={data.to}
      className={classNames(
        `text-xs md:text-base flex flex-row items-center space-x-4 px-4 py-2`,
        data.to === location.pathname
          ? "text-white bg-blue-500"
          : "text-blue-500 bg-white hover:text-white hover:bg-blue-500"
      )}
    >
      <i className={classNames(data.icon)} />
      <span className="whitespace-nowrap">{data.label}</span>
    </Link>
  );
};
