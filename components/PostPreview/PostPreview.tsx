import { useQuery } from "@apollo/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/future/image";
import { SINGLE_POST_QUERY } from "../../apollo/queries";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const PostPreview = ({ id, className }) => {
  const {
    data: { post } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(SINGLE_POST_QUERY, {
    variables: { id },
  });

  if (!post) return null;

  const videoJsOptions = {
    autoplay: false,
    fill: true,
    sources: [
      {
        src: post.media.url,
        type: "video/mp4",
      },
    ],
  };

  return (
    (<li
        className={classNames("relative cursor-pointer w-full h-full", {
          [className]: !!className,
        })}
      >
      <Link href="/post/[postId]" as={`/post/${post.id}`}>
        <a>
          <div className="h-full" key={post.id}>
            {/(\.png$|\.jpg$|\.heic$|\.webp$)/.test(post.media[0].url) ? (
              <Image
                width={350}
                height={350}
                className="object-cover h-full w-full"
                src={post.media[0].url
                  .replace(/(\.png$|\.heic$|\.webp$)/, ".jpg")
                  .replace(
                    "/upload",
                    "/upload/w_350,h_350,ar_1:1,c_fill,dpr_2.0",
                  )}
                alt="post preview"
              />
            ) : (
              /* TODO: instagram uses the poster <img /> here instead of the actual video element */
              (<VideoPlayer
                className="object-cover h-full w-full"
                options={videoJsOptions}
              />)
            )}
          </div>
          <div className="grid place-items-center absolute top-0 bg-black/30 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="grid grid-cols-2 gap-x-4">
              <span className="grid grid-cols-2 gap-x-2 place-items-center text-white text-lg font-bold">
                <FontAwesomeIcon
                  icon={["fas", "heart"]}
                  className="text-white"
                  size="lg"
                />
                {post.likes.length}
              </span>
              <span className="grid grid-cols-2 gap-x-2 place-items-center text-white text-lg font-bold">
                <FontAwesomeIcon
                  icon={["fas", "comment"]}
                  className="text-white"
                  size="lg"
                />
                {post.comments.length}
              </span>
            </div>
          </div>
        </a>
      </Link>
    </li>)
  );
};

export default PostPreview;
