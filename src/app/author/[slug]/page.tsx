import List from '@/components/list';

//Dynamic metadata generating
export async function generateMetadata(props: any) {
  const params = await props.params;
  const param = params.slug;
  const param_data = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/users?slug=${param}`
  ).then((res) => res.json());

  return {
    title: param_data['0'].name + ' - Author',
    description: 'Author',
  };
}

export default async function Page(props: any) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  //Get search param count
  const page =
    searchParams.page == undefined
      ? 1
      : isNaN(searchParams.page)
      ? 1
      : Number(searchParams.page);

  //Get author info from api
  const author = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/users?slug=${params.slug}`
  ).then((res) => res.json());

  return (
    <main>
      <section>
        <h1 className="text-pageheader font-bold my-2">
          {/*Author name*/}
          Author: {author['0'].name}
        </h1>
      </section>
      <List author={author} page={page} />
    </main>
  );
}
