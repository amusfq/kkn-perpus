import React from "react";
import classNames from "./../../../Utils/classNames";

type Props = {
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
  onPageChange: (page:number) => void;
};

export default function Pagination({ links, onPageChange }: Props) {
  return (
    <nav>
      <ul className="flex ">
        {links.map((link, idx) => (
          <li key={idx} className="page-item">
            <button
              className={classNames(
                "relative block px-3 py-2 border",
                link.label === "&laquo; Previous"
                  ? "rounded-l-md"
                  : link.label === "Next &raquo;"
                  ? "rounded-r-md"
                  : "border-x-transparent",
                  link.active ? 'text-white bg-blue-500 border-blue-600 cursor-default': 'text-blue-500 bg-white hover:text-white hover:border-blue-600 hover:bg-blue-500',
                  (link.url === null && (link.label === "&laquo; Previous" || link.label === "Next &raquo;")) ? 'hover:bg-white hover:border-gray-200 hover:text-blue-500': '' 
              )}
              aria-label={link.label}
              onClick={() => onPageChange(link.url ? Number(link.url.split('?page=')[1]) : 0)}
              disabled={(link.url === null && (link.label === "&laquo; Previous" || link.label === "Next &raquo;")) }
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: link.label
                    .replace("Previous", "")
                    .replace("Next", ""),
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
