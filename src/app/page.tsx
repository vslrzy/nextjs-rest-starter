import List from "@/components/list";

export default async function Home(props: any) {
  const searchParams = await props.searchParams;
  //Get search param count
  const page =
    searchParams.page == undefined
      ? 1
      : isNaN(searchParams.page)
      ? 1
      : Number(searchParams.page);

  return (
    <main className="w-full top-0">
      <section>
        <h1 className="text-pageheader font-bold py-5">Latest posts</h1>
      </section>
      {/* @ts-expect-error Server Component */}
      <List page={page} />
    </main>
  );
}
