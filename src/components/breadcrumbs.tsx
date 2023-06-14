import Link from 'next/link';

export default async function Breadcrumbs({ categoryID }: any) {
  //Get passed category info by ID
  const data = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/categories/${categoryID}`
  ).then((res) => res.json());
  return (
    <div className="w-full py-3 border-b-1 text-sm font-medium">
      <section>
        <Link href={'/'}>Homepage</Link>
        {' / '}
        {/*Category name*/}
        <Link href={`/category/${data.slug}`}>{data.name}</Link>
      </section>
    </div>
  );
}
