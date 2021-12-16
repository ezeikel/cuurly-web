import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { EXPLORE_QUERY } from "../apollo/queries";
import Post from "../components/Post/Post";
import useUser from "../hooks/useUser";

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const ExplorePage = () => {
  const { user } = useUser();

  const {
    data: { explore: posts } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(EXPLORE_QUERY, {
    variables: { id: user?.id },
    skip: !!user,
  });

  if (!user) return null;

  if (!posts?.length) return <span>No posts found.</span>;

  return (
    <Wrapper>
      <h1>Explore.</h1>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </Wrapper>
  );
};

export default ExplorePage;
