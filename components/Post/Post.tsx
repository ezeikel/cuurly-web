import { useState, useContext } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import formatDistance from "date-fns/formatDistance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LikeButton from "../LikeButton/LikeButton";
import PostComment from "../PostComment/PostComment";
import Comment from "../Comment/Comment";
import DeletePost from "../DeletePost/DeletePost";
import { SINGLE_POST_QUERY } from "../../apollo/queries";
import blankProfilePicture from "../../utils/blankProfileImage";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { AuthContext } from "../../contexts/auth";
import {
  Wrapper,
  PostHeader,
  Photo,
  Details,
  Username,
  Location,
  PostContent,
  PostInteraction,
  Buttons,
  Likes,
  Caption,
  PostTime,
  AddComment,
  ModalBody,
  CommentList,
  PostActions,
  PostAction,
} from "./Post.styled";
import GenericModal from "../GenericModal/GenericModal";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const Post = ({ id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const { currentUser } = useContext(AuthContext);

  if (!id || !currentUser) return null;

  const {
    loading,
    data: { post } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(SINGLE_POST_QUERY, {
    variables: { id },
  });

  if (loading || !post) return null;

  const isCurrentUsersPost = currentUser && currentUser.id === post.author.id;

  const videoJsOptions = {
    autoplay: false,
    fluid: true,
    sources: [
      {
        src: post.content.url,
        type: "video/mp4",
      },
    ],
  };

  return (
    <Wrapper>
      <PostHeader>
        <Photo>
          <img
            src={
              (post.author.profilePicture &&
                post.author.profilePicture.url.replace(
                  "/upload",
                  "/upload/w_30,h_30,c_lfill,g_face,dpr_2.0",
                )) ||
              blankProfilePicture()
            }
            alt="post"
          />
        </Photo>
        <Details>
          <Username>{post.author.username}</Username>
          <Location>Random post location</Location>
        </Details>
        <StyledFontAwesomeIcon
          onClick={openModal}
          icon={["far", "ellipsis-h"]}
          color="var(--color-black)"
          size="lg"
        />
        <GenericModal
          isOpen={modalIsOpen}
          close={closeModal}
          contentLabel="Post Actions"
        >
          <ModalBody>
            <PostActions>
              <PostAction>
                <Link href="/post/[postId]" as={`/post/${post.id}`}>
                  <a>
                    <span>Go to Post</span>
                  </a>
                </Link>
              </PostAction>
              {isCurrentUsersPost ? (
                <>
                  <PostAction disabled>
                    <span>Archive</span>
                  </PostAction>
                  <PostAction disabled>
                    <span>Edit</span>
                  </PostAction>
                </>
              ) : null}
              <PostAction disabled>
                <span>Copy Link</span>
              </PostAction>
              <PostAction disabled>
                <span>Share</span>
              </PostAction>
              {isCurrentUsersPost ? (
                <PostAction actionType="negative">
                  <DeletePost post={post} />
                </PostAction>
              ) : null}
              {!isCurrentUsersPost ? (
                <>
                  <PostAction disabled>
                    <span>Mute</span>
                  </PostAction>
                  <PostAction disabled actionType="negative">
                    <span>Report</span>
                  </PostAction>
                  <PostAction actionType="negative">
                    <span>Unfollow</span>
                  </PostAction>
                </>
              ) : null}
              <PostAction>
                <span onClick={closeModal}>Cancel</span>
              </PostAction>
            </PostActions>
          </ModalBody>
        </GenericModal>
      </PostHeader>
      <PostContent>
        {/(\.png$|\.jpg$|\.heic$)/.test(post.content.url) ? (
          <img
            src={post.content.url
              .replace(/(\.png$|\.heic$)/, ".jpg")
              .replace("/upload", "/upload/w_350,h_350,ar_1:1,c_fill,dpr_2.0")}
            alt="post"
          />
        ) : (
          <VideoPlayer {...videoJsOptions} />
        )}
      </PostContent>
      <PostInteraction>
        {currentUser ? (
          <Buttons>
            <LikeButton postId={id} postLikes={post.likes} />
          </Buttons>
        ) : null}
        {post.likes.length ? (
          <Likes>
            {post.likes.length} like
            {post.likes.length > 1 ? "s" : null}
          </Likes>
        ) : null}
        <Caption>
          <Link href="/[username]" as={`/${post.author.username}`}>
            <a>{post.author.username}</a>
          </Link>
          {post.caption}
        </Caption>
        <CommentList>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} post={post} />
          ))}
        </CommentList>
        <PostTime>
          {formatDistance(post.createdAt, new Date(), {
            includeSeconds: true,
          })}{" "}
          ago
        </PostTime>
        {currentUser ? (
          <AddComment>
            <PostComment postId={post.id} />
          </AddComment>
        ) : (
          <span>Log in to comment.</span>
        )}
      </PostInteraction>
    </Wrapper>
  );
};

export default Post;
