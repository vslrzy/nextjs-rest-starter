import Breadcrumbs from '@/components/breadcrumbs';
import List from '@/components/list';

//Dynamic metadata generating
export async function generateMetadata({ params }: any) {
  const param = params.slug;
  const param_data = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/categories?slug=${param}`
  ).then((res) => res.json());

  return {
    title: param_data['0'].name + ' - Category',
    description: 'Author',
  };
}

export default async function Page({ searchParams, params }: any) {
  //Get search param count
  const page =
    searchParams.page == undefined
      ? 1
      : isNaN(searchParams.page)
      ? 1
      : Number(searchParams.page);

  //Get category info from api
  const category_info = await fetch(
    process.env.NEXT_PUBLIC_URL +
      `/wp-json/wp/v2/categories?slug=${params.slug}`
  ).then((res) => res.json());

  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <Breadcrumbs categoryID={category_info['0'].id} />
      <section>
        <h1 className="text-pageheader font-bold my-2">
          {/*Category name*/}
          Category: {category_info['0'].name}
        </h1>
      </section>
      {/* @ts-expect-error Server Component */}
      <List category={category_info} page={page} />
    </main>
  );
}
