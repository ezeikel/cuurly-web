import Link from "next/link";
import Image from "next/image";
import { getCurrentUserLikes } from "../actions";

const LikedPage = async () => {
  const likes = await getCurrentUserLikes();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Feed Page</h1>
      <ul>
        {likes.map((like) => (
          <div key={like.post.id}>
            <Link href={`/post/${like.post.id}`}>
              {like.post.author.username}
            </Link>
            <Image
              width={350}
              height={350}
              // TODO: multiple media for a post
              src={like.post.media[0].url}
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
