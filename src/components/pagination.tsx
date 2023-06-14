'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Pagination({ count }: any) {
  const path_name = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get('page');
  const page = param == null ? 1 : Number(param);

  const [state, setState] = useState(page);

  useEffect(() => {
    setState(page);
  }, [page]);

  return (
    <div className="w-full mx-auto">
      <section className="flex w-full justify-center items-center gap-5 py-3">
        {page > 1 && (
          <Link
            href={{
              pathname: path_name,
              query: { page: `${Number(state) - 1}` },
            }}
            className="border-1 px-5 py-2  rounded-md text-sm font-medium hover:bg-[rgba(0,0,0,0.1)]"
          >
            Prev
          </Link>
        )}
        {page !== count && (
          <Link
            href={{
              pathname: path_name,
              query: { page: `${Number(state) + 1}` },
            }}
            className="border-1 px-5 py-2  rounded-md text-sm font-medium hover:bg-[rgba(0,0,0,0.1)]"
          >
            Next
          </Link>
        )}
      </section>
    </div>
  );
}
