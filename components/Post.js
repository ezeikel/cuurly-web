import { useState, Fragment } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import styled from "styled-components";
import { SINGLE_POST_QUERY } from "../apollo/queries";
import LikeButton from "./LikeButton";
import PostComment from "./PostComment";
import CommentList from "./styles/CommentList";
import Comment from "./Comment";
import DeletePost from "./DeletePost";
import formatDistance from "date-fns/formatDistance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import CurrentUser from "./CurrentUser";
import blankProfilePicture from "../utils/blankProfileImage";

const Wrapper = styled.article`
  display: grid;
  grid-template-rows: 60px auto;
  grid-row-gap: var(--spacing-medium);
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
`;

const PostHeader = styled.header`
  display: grid;
  grid-template-columns: 30px 1fr auto;
  grid-template-rows: 30px;
  grid-column-gap: var(--spacing-small);
  align-items: center;
  padding: var(--spacing-medium);
  border-bottom: 1px solid #efefef;
  border-bottom-width: 0.5px;
`;

const Photo = styled.div`
  display: grid;
  img {
    border-radius: 50%;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 2px;
  line-height: 1;
`;

const Username = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const Location = styled.span`
  font-size: 1.2rem;
`;

const PostContent = styled.div`
  display: grid;
`;

const PostInteraction = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-row-gap: var(--spacing-small);
  padding: 0 var(--spacing-medium);
`;

const Buttons = styled.section`
  display: grid;
`;

const Likes = styled.div`
  display: grid;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const Caption = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-small);
  font-size: 1.4rem;
  line-height: 1.8rem;
  a {
    font-weight: bold;
  }
`;

const PostTime = styled.div`
  display: grid;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  line-height: 18px;
  color: #999;
  text-transform: uppercase;
`;

const AddComment = styled.section`
  display: grid;
  border-top: 1px solid #efefef;
  min-height: 56px;
`;

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <Modal className={modalClassName} portalClassName={className} {...props} />
);

const StyledModal = styled(ReactModalAdapter).attrs({
  //https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: "overlay",
  modalClassName: "modal",
})`
  /* Portal styles here (though usually you will have none) */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
  }
  .modal {
    display: grid;
    background-color: var(--color-white);
    min-height: 200px;
    max-height: 400px;
    width: 400px;
    border-radius: 4px;
    outline: 0;
    overflow-y: scroll;
  }
`;

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const ModalBody = styled.div`
  overflow-y: scroll;
`;

const PostActions = styled.ul`
  display: grid;
`;

const PostAction = styled.li`
  display: grid;
  align-items: center;
  justify-content: space-around;
  min-height: 48px;
  padding: 4px 8px;
  line-height: 1.5;
  & + li {
    border-top: 1px solid #efefef;
  }
  span {
    cursor: pointer;
    ${({ actionType }) =>
      actionType === "negative"
        ? `
    color: var(--color-red);
  `
        : null}
    ${({ disabled }) =>
      disabled
        ? `
    pointer-events: none;
    opacity: 0.3;
  `
        : null}
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const Post = ({ id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <CurrentUser>
      {({ data }) => (
        <Query query={SINGLE_POST_QUERY} variables={{ id }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            const isCurrentUsersPost =
              data.currentUser && data.currentUser.id === data.post.author.id;

            return (
              <Wrapper>
                <PostHeader>
                  <Photo>
                    <img
                      src={
                        (data.post.author.profilePicture &&
                          data.post.author.profilePicture.url.replace(
                            "/upload",
                            "/upload/w_30,h_30,c_lfill,g_face,dpr_2.0"
                          )) ||
                        blankProfilePicture()
                      }
                    />
                  </Photo>
                  <Details>
                    <Username>{data.post.author.username}</Username>
                    <Location>Random data.post location</Location>
                  </Details>
                  <StyledFontAwesomeIcon
                    onClick={openModal}
                    icon={["far", "ellipsis-h"]}
                    color="var(--color-black)"
                    size="lg"
                  />
                  <StyledModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Post Actions"
                  >
                    <ModalBody>
                      <PostActions>
                        <PostAction>
                          <span>Go to Post</span>
                        </PostAction>
                        {isCurrentUsersPost ? (
                          <Fragment>
                            <PostAction disabled={true}>
                              <span>Archive</span>
                            </PostAction>
                            <PostAction disabled={true}>
                              <span>Edit</span>
                            </PostAction>
                          </Fragment>
                        ) : null}
                        <PostAction disabled={true}>
                          <span>Copy Link</span>
                        </PostAction>
                        <PostAction disabled={true}>
                          <span>Share</span>
                        </PostAction>
                        {isCurrentUsersPost ? (
                          <PostAction actionType="negative">
                            <DeletePost post={post} />
                          </PostAction>
                        ) : null}
                        {!isCurrentUsersPost ? (
                          <Fragment>
                            <PostAction disabled={true}>
                              <span>Mute</span>
                            </PostAction>
                            <PostAction disabled={true} actionType="negative">
                              <span>Report</span>
                            </PostAction>
                            <PostAction actionType="negative">
                              <span>Unfollow</span>
                            </PostAction>
                          </Fragment>
                        ) : null}
                        <PostAction>
                          <span onClick={closeModal}>Cancel</span>
                        </PostAction>
                      </PostActions>
                    </ModalBody>
                  </StyledModal>
                </PostHeader>
                <PostContent>
                  <img
                    src={
                      data.post.content.url.replace(
                        "/upload",
                        "/upload/w_614,ar_4:5,c_limit,dpr_2.0"
                      ) || blankProfilePicture()
                    }
                  />
                </PostContent>
                <PostInteraction>
                  {data.currentUser ? (
                    <Buttons>
                      <LikeButton postId={id} postLikes={data.post.likes} />
                    </Buttons>
                  ) : null}
                  {data.post.likes.length ? (
                    <Likes>
                      {data.post.likes.length} like
                      {data.post.likes.length > 1 ? "s" : null}
                    </Likes>
                  ) : null}
                  <Caption>
                    <Link href={`/user?id=${data.post.author.id}`}>
                      <a>{data.post.author.username}</a>
                    </Link>
                    {data.post.caption}
                  </Caption>
                  <CommentList>
                    {data.post.comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        post={data.post}
                      />
                    ))}
                  </CommentList>
                  <PostTime>
                    {formatDistance(data.post.createdAt, new Date(), {
                      includeSeconds: true,
                    })}{" "}
                    ago
                  </PostTime>
                  {data.currentUser ? (
                    <AddComment>
                      <PostComment postId={data.post.id} />
                    </AddComment>
                  ) : (
                    <span>Log in to comment.</span>
                  )}
                </PostInteraction>
              </Wrapper>
            );
          }}
        </Query>
      )}
    </CurrentUser>
  );
};

export default Post;
