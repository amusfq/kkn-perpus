import React from "react";

type Props = {};

export default function NewBooks({}: Props) {
  return (
    <div className="px-4 md:px-12 flex flex-col md:flex-row md:space-x-24 space-y-8 md:space-y-0">
      <div className="w-full md:w-5/12">
        <img
          src="https://api.lorem.space/image/book?w=500&h=800"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="w-full md:w-7/12 space-y-4">
        <h1 className="text-3xl font-bold">Buku terbaru</h1>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          distinctio dignissimos minima in
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://api.lorem.space/image/book?w=500&h=800"
            alt=""
            className="aspect-square w-full object-scale-down object-center"
          />
          <img
            src="https://api.lorem.space/image/book?w=500&h=800"
            alt=""
            className="aspect-square w-full object-scale-down object-center"
          />
          <img
            src="https://api.lorem.space/image/book?w=500&h=800"
            alt=""
            className="aspect-square w-full object-scale-down object-center"
          />
          <img
            src="https://api.lorem.space/image/book?w=500&h=800"
            alt=""
            className="aspect-square w-full object-scale-down object-center"
          />
        </div>
      </div>
    </div>
  );
}
