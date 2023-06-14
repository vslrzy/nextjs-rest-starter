import Image from 'next/image';
import Link from 'next/link';
import { Category } from './post-info';

export const PostCard = ({ post }: any) => {
  return (
    <div className="p-3 w-full">
      <div className="bg-white border-1 flex-col md:flex-row flex min-h-[240px] hover:shadow-normal transition duration-200">
        {post._embedded['wp:featuredmedia'] && (
          <div className="md:basis-1/3 h-100">
            <Image
              priority
              src={post._embedded['wp:featuredmedia']['0'].link}
              width={'500'}
              height={'500'}
              alt={post._embedded['wp:featuredmedia']['0'].title}
              className="w-full h-[300px] object-cover "
            />
          </div>
        )}

        <div
          className={`py-5 ${
            post._embedded['wp:featuredmedia'] && 'md:basis-2/3'
          } px-10 flex flex-col gap-3 justify-between`}
        >
          {post.categories && (
            <div className="flex">
              {post.categories.map((category: any) => (
                <>
                  {/* @ts-expect-error Server Component */}
                  <Category key={category} category={category} />{' '}
                </>
              ))}
            </div>
          )}
          <Link href={`/post/${post.id}`}>
            <h1
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              className=" text-cardheader font-bold text-ellipsis  hover:underline"
            />
          </Link>

          <div
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            className=" text-sm"
          />
          <Link
            href={'/post/' + post.id}
            className="border-1 w-[120px] text-center py-2 px-5 hover:bg-[rgba(0,0,0,0.1)]"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};
