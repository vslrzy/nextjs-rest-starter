import Breadcrumbs from "@/components/breadcrumbs";
import List from "@/components/list";
import { Author, Category } from "@/components/post-info";
import Image from "next/image";

//Dynamic metadata generating
export async function generateMetadata(props: any) {
  const params = await props.params;
  const param = params.id;
  const param_data = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/posts/${param}`
  ).then((res) => res.json());

  return {
    title: param_data.title.rendered,
    description: "Author",
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

  //Get post info from api
  const data = await fetch(
    process.env.NEXT_PUBLIC_URL + `/wp-json/wp/v2/posts/${params.id}?_embed`
  ).then((res) => res.json());

  return (
    <main>
      {data.categories && <Breadcrumbs categoryID={data.categories["0"]} />}
      <section>
        {/*Post title*/}
        <h1
          dangerouslySetInnerHTML={{ __html: data.title.rendered }}
          className="text-pageheader font-bold my-2"
        />
        {/*Post categories*/}
        {data.categories && (
          <div>
            <span className="font-medium text-sm">Category: </span>
            {data.categories.map((category: any, index: number) => (
              <Category category={category} key={index} />
            ))}
          </div>
        )}
        {/*Post author*/}
        {data.author && (
          <div>
            <span className="font-medium text-sm">Author: </span>
            <Author author={data.author} />
          </div>
        )}
        {/*Post featured image*/}
        {data._embedded["wp:featuredmedia"] && (
          <Image
            width={"600"}
            height={"600"}
            alt={data.slug}
            src={data._embedded["wp:featuredmedia"]["0"].source_url}
            className="w-full h-[550px] object-cover my-2"
          />
        )}
        {/*Post content*/}
        {data.content && (
          <div
            dangerouslySetInnerHTML={{ __html: data.content.rendered }}
            id="content"
            className="text-sm font-regular"
          />
        )}
      </section>

      {/*Latest posts from same category*/}
      {data.categories && (
        <List category={data.categories} page={page} postID={data.id} />
      )}
    </main>
  );
}
