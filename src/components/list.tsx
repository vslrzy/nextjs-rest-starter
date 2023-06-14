import Pagination from './pagination';
import { PostCard } from './postcard';

export default async function List({
  category,
  author,
  page,
  postID,
  search,
}: any) {
  //Slug creating and modifying functions
  const url = `/wp-json/wp/v2/posts${
    author == undefined
      ? category == undefined
        ? search == undefined
          ? `?_embed&page=${page}`
          : `?search=${search}&_embed&page=${page}`
        : `?categories=${
            category['0'].id == undefined ? category : category['0'].id
          }&_embed&page=${page}`
      : `?author=${author['0'].id}&_embed&page=${page}`
  }`;

  //Get current posts page count
  const page_count = await fetch(process.env.NEXT_PUBLIC_URL + url, {
    cache: 'no-store',
  }).then((res) => res.headers.get('X-WP-TotalPages'));

  //Get all posts
  const data = await fetch(process.env.NEXT_PUBLIC_URL + url, {
    cache: 'no-store',
  }).then((res) => res.json());

  //Get posts is the passed data don't passed by post for releated posts
  const posts =
    postID !== undefined
      ? data.filter(function ({ id }: any) {
          return id != postID;
        })
      : data;

  return (
    <main>
      <section>
        {postID && (
          <h1 className="text-pageheader font-bold my-10">Other posts</h1>
        )}
        <div>
          {posts &&
            posts.map((post: any) => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
      {postID == undefined && <Pagination count={Number(page_count)} />}
    </main>
  );
}
