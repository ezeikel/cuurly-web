import { useQuery } from "@apollo/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SINGLE_POST_QUERY } from "../../apollo/queries";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Wrapper, Preview, Overlay, Stats, Stat } from "./PostPreview.styled";

const PostPreview = ({ id }) => {
  const {
    loading,
    error,
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
        src: post.content.url,
        type: "video/mp4",
      },
    ],
  };

  return (
    <Wrapper>
      <Link href="/post/[postId]" as={`/post/${post.id}`}>
        <a>
          <Preview key={post.id}>
            {/(\.png$|\.jpg$|\.heic$)/.test(post.content.url) ? (
              <img
                src={post.content.url
                  .replace(/(\.png$|\.heic$)/, ".jpg")
                  .replace(
                    "/upload",
                    "/upload/w_350,h_350,ar_1:1,c_fill,dpr_2.0",
                  )}
              />
            ) : (
              /* TODO: instagram uses the poster <img /> here instead of the actual video element */
              <VideoPlayer {...videoJsOptions} />
            )}
          </Preview>
          <Overlay>
            <Stats>
              <Stat>
                <FontAwesomeIcon
                  icon={["fas", "heart"]}
                  color="var(--color-white)"
                  size="lg"
                />
                {post.likes.length}
              </Stat>
              <Stat>
                <FontAwesomeIcon
                  icon={["fas", "comment"]}
                  color="var(--color-white)"
                  size="lg"
                />
                {post.comments.length}
              </Stat>
            </Stats>
          </Overlay>
        </a>
      </Link>
    </Wrapper>
  );
};

export default PostPreview;
