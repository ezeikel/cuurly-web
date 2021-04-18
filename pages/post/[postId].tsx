import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Post from "../../components/Post";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 614px);
  justify-content: center;
  grid-row-gap: var(--spacing-medium);
  padding: var(--padding-page-wrap);
`;

const PostPage: FunctionComponent = () => {
  const router = useRouter();
  const { postId } = router.query;

  if (!postId) return null;

  return (
    <Wrapper>
      <Post id={postId} />
    </Wrapper>
  );
};

export default PostPage;
