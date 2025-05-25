"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchForm() {
  const [state, setState] = useState("");
  const [data, setData]: any = useState(null);

  //Get searched data from api
  async function getSearch() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/wp-json/wp/v2/posts?search=${state}&_embed`
    ).then((res) => res.json());

    setData(response);
  }

  useEffect(() => {
    getSearch();
  });

  return (
    <div>
      <form
        className="flex gap-1 py-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="border-1 rounded-md w-full py-3 px-5 outline-none"
          type={"search"}
          placeholder={"Search"}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        <Link
          href={`/search?query=${state}`}
          className="border-1 flex items-center justify-center px-5 rounded-md hover:bg-[rgba(0,0,0,0.1)] min-w-[130px]"
        >
          Full search
        </Link>
      </form>
      {data == null ? (
        ""
      ) : data.length == 0 ? (
        <h1 className="text-pageheader text-center font-bold py-5">
          Nothing founded
        </h1>
      ) : (
        <div className="border-1 p-5 flex flex-col gap-4 rounded-md">
          {data.map((post: any) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <h1
                className="text-md hover:underline font-medium"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
