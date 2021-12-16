import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../apollo/queries";
import Post from "../components/Post/Post";
import useUser from "../hooks/useUser";

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

const FeedPage = () => {
  const { user } = useUser();

  const {
    data: { feed: posts } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(FEED_QUERY, {
    variables: { id: user?.id },
    skip: !!user, // wait for currentUser query before executing this one - https://github.com/apollographql/react-apollo/issues/3624#issuecomment-545990545
  });

  if (!user) return null;

  if (!posts?.length) return <span>No posts found.</span>;

  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </Wrapper>
  );
};

export default FeedPage;
