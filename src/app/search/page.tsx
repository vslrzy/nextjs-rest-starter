import List from '@/components/list';
import SearchForm from '@/components/search-form';

export default async function Page(props: any) {
  const searchParams = await props.searchParams;
  //Get search param count
  const page =
    searchParams.page == undefined
      ? 1
      : isNaN(searchParams.page)
      ? 1
      : Number(searchParams.page);

  //Get query params
  const query = searchParams.query && searchParams.query;

  //Get search result count
  const result =
    query &&
    (await fetch(
      process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/posts?search=${query}`,
      { cache: 'no-store' }
    ).then((res) => res.headers.get('X-WP-Total')));

  return (
    <main>
      <div>
        {query == undefined ? (
          <section>
            <h1 className="text-pageheader text-center font-bold py-5">
              Search something
            </h1>
            <SearchForm />
          </section>
        ) : result == 0 ? (
          <section>
            <h1 className="text-pageheader text-center font-bold py-5">
              Nothing founded
            </h1>
            <SearchForm />
          </section>
        ) : (
          <>
            <section>
              <h1 className="text-pageheader text-center font-bold py-5">
                {result} results founded
              </h1>
              <SearchForm />
            </section>
            <List search={query} page={page} />
          </>
        )}
      </div>
    </main>
  );
}
