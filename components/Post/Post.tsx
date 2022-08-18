import { useState } from "react";
import { useQuery } from "@apollo/client";
import formatDistance from "date-fns/formatDistance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { SINGLE_POST_QUERY } from "../../apollo/queries";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Avatar from "../Avatar/Avatar";
import PostActionsModal from "../modals/PostActionsModal/PostActionsModal";
import Spinner from "../Spinner/Spinner";
import PostInteractions from "../PostInteractions/PostInteractions";
import PostCommentForm from "../forms/PostCommentForm/PostCommentForm";
import PostLikes from "../PostLikes/PostLikes";
import PostCaption from "../PostCaption/PostCaption";
import PostComments from "../PostComments/PostComments";

type PostProps = {
  id?: string;
  post?: any;
  className?: string;
  mediaClasses?: string;
};

const Post = ({ id, post: postData, className, mediaClasses }: PostProps) => {
  const [postActionsModalIsOpen, setPostActionsModalIsOpen] = useState(false);
  const openPostActionsModal = () => setPostActionsModalIsOpen(true);
  const closePostActionsModal = () => setPostActionsModalIsOpen(false);

  const {
    loading: loadingPost,
    data: { post: fetchedPostData } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(SINGLE_POST_QUERY, {
    variables: { id },
    skip: !id,
  });

  // either post from feed query or fetched post from single post query
  const post = postData || fetchedPostData;

  const videoJsOptions = {
    autoplay: false,
    fluid: true,
    sources: [
      {
        src: post?.media.url,
        type: "video/mp4",
      },
    ],
  };

  if (loadingPost) {
    return <Spinner />;
  }

  if (!post) return null;

  return (
    <>
      <div
        className={classNames(
          "flex flex-col rounded border border-slate-200 bg-white",
          {
            [className]: !!className,
          },
        )}
      >
        <header className="grid grid-cols-[30px_1fr_auto] grid-rows-[30px] gap-x-2 items-center p-4 border-[#efefef] border-b-[0.5px]">
          <Avatar
            src={post.author?.profilePicture?.url.replace(
              "/upload",
              "/upload/w_30,h_30,c_lfill,g_face,dpr_2.0",
            )}
            className="h-8 w-8"
          />
          <div className="grid grid-rows-2 gap-y-0.5">
            <div className="text-sm font-bold">{post.author?.username}</div>
            <div className="text-xs">Random post location</div>
          </div>
          <FontAwesomeIcon
            onClick={openPostActionsModal}
            icon={["far", "ellipsis-h"]}
            color="var(--color-black)"
            size="lg"
            className="cursor-pointer"
          />
        </header>
        {/** TODO: support multiple media */}
        {/(\.png$|\.jpg$|\.heic$|\.webp$)/.test(post.media[0].url) ? (
          <img
            className={classNames("aspect-square w-full", {
              [mediaClasses]: !!mediaClasses,
            })}
            src={post.media[0].url
              .replace(/(\.png$|\.heic$|\.webp$)/, ".jpg")
              .replace("/upload", "/upload/w_350,h_350,ar_1:1,c_fill,dpr_2.0")}
            alt="post"
          />
        ) : (
          <VideoPlayer options={videoJsOptions} />
        )}
        <div className="p-4 border-b-[1px] border-slate-200">
          <PostInteractions className="mb-2" post={post} />
          <PostLikes className="mb-2" likes={post.likes} />
          <PostCaption
            caption={post.caption}
            author={post.author}
            className="mb-2"
          />
          <PostComments post={post} className="mb-4" />
          <div className="text-xs leading-3 text-[#999]">
            {formatDistance(post.createdAt, new Date(), {
              includeSeconds: true,
            })}
            &nbsp;ago
          </div>
        </div>
        <PostCommentForm postId={post.id} />
      </div>
      <PostActionsModal
        post={post}
        isOpen={postActionsModalIsOpen}
        handleClose={closePostActionsModal}
      />
    </>
  );
};

export default Post;
