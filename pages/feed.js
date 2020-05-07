import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../apollo/queries";
import Post from "../components/Post";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 614px);
  justify-content: center;
  grid-row-gap: var(--spacing-medium);
  padding: var(--padding-page-wrap);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const FeedPage = ({ query }) => {
  const {
    loading,
    error,
    data: { feed } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(FEED_QUERY, {
    variables: { id: query.id },
  });

  if (!feed) return null;

  return (
    <Wrapper>
      {feed.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </Wrapper>
  );
};

export default FeedPage;
