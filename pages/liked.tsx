import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import Image from "next/future/image";
import { LIKED_POSTS_QUERY } from "../apollo/queries";

const LikedPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { user } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(LIKED_POSTS_QUERY, {
    variables: { id },
  });

  if (!user) return null;

  if (!user.likes?.length) return <span>No likes yet.</span>;

  return (
    <div>
      <h1>Likes</h1>
      <ul>
        {user.likes.map((like) => (
          <div key={like.post.id}>
            <Link href="/post/[postId]" as={`/post/${like.post.id}`}>
              <a>{like.post.author.username}</a>
            </Link>
            <Image
              width={350}
              height={350}
              src={like.post.media.url}
              alt="post"
            />
            <span>{like.post.caption}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LikedPage;
