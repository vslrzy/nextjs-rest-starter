import Link from 'next/link';

//Posts categories
const Category = async ({ category }: any) => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/categories/${category}`
  ).then((res) => res.json());
  return (
    <Link href={`/category/${data.slug}`}>
      <span className="font-medium border-1 px-3 py-1 text-sm my-2 inline-block mr-1 rounded-sm shadow-sm">
        {data.name}
      </span>
    </Link>
  );
};

//Post author
const Author = async ({ author }: any) => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/users/${author}`
  ).then((res) => res.json());
  return (
    <Link href={`/author/${data.slug}`}>
      <span className="font-medium border-1 px-3 py-1 text-sm my-2 inline-block mr-1 rounded-sm shadow-sm">
        {data.name}
      </span>
    </Link>
  );
};

export { Category, Author };
