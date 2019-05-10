import Link from 'next/link';
import styled from 'styled-components';
import Post from '../components/Post';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 614px);
  justify-content: center;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const PostPage = ({ query }) => (
  <Wrapper>
    <Post id={query.id} />
  </Wrapper>
);

export default PostPage;
