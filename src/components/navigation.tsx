'use client';

import Link from 'next/link';
import { ContextFunction } from './context';
import { useState } from 'react';
import Image from 'next/image';

export const Navigation = () => {
  const [toggle, setToggle] = useState(true);
  const { passed } = ContextFunction();

  return (
    <nav className="w-full fixed bg-white top-0 left-0 right-0 pt-2 px-2">
      <section className="flex w-full h-[100px] items-center justify-between relative border-1 rounded-md shadow-sm">
        <Logo setToggle={setToggle} />

        <div className="flex items-center gap-5">
          <Link href={'/search'} className="h-[20px]">
            <Image
              width={'500'}
              height={'500'}
              alt={'search_icon'}
              className="h-full w-auto"
              src="/search.svg"
            />
          </Link>
          <div
            className="flex h-[40px] gap-1 cursor-pointer items-center"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <span className="w-[7px] h-[7px] bg-black rounded-full"></span>
            <span className="w-[7px] h-[7px] bg-black rounded-full"></span>
            <span className="w-[7px] h-[7px] bg-black rounded-full"></span>
          </div>
        </div>

        <div
          className={` fixed top-[100px] left-0 right-0 px-2 ${
            toggle ? 'hidden' : 'block'
          }`}
        >
          <section className="border-1 shadow-sm rounded-md bg-white mt-5 py-8">
            <h1 className="px-1 py-5 text-header font-bold">Categories</h1>
            <div className=" overflow-y-scroll md:h-auto h-[60vh] navigation">
              {/* @ts-expect-error Server Component */}
              {passed.categories_data.length == 0 ? (
                'There are not any category'
              ) : (
                <div className="h-auto md:flex-row flex-col flex flex-wrap">
                  {/* @ts-expect-error Server Component */}
                  {passed.categories_data.map((category) => (
                    <Link
                      href={`/category/${category.slug}`}
                      key={category.id}
                      className="md:basis-1/6 p-1"
                      onClick={() => {
                        setToggle(true);
                      }}
                    >
                      <span className="border-1 block p-3 text-sm font-medium shadow-sm rounded-md hover:bg-[rgba(0,0,0,0.2)]">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </nav>
  );
};

export const Logo = ({ setToggle }: any) => {
  const { passed } = ContextFunction();
  return (
    <Link
      href={'/'}
      className="h-full flex items-center"
      onClick={() => {
        setToggle && setToggle(true);
      }}
    >
      {/* @ts-expect-error Server Component */}
      {passed.site_logo_data == null ? (
        <span className="text-logo font-bold">
          {/* @ts-expect-error Server Component */}
          {passed.site_name}
        </span>
      ) : (
        <Image
          width={'500'}
          height={'500'}
          alt={'logo'}
          className="h-[40px] w-auto"
          src={
            /* @ts-expect-error Server Component */
            passed.site_logo_data.link
          }
        />
      )}
    </Link>
  );
};
