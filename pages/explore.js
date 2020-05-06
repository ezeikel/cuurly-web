import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { EXPLORE_QUERY } from "../apollo/queries";
import Post from "../components/Post";

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const ExplorePage = ({ query }) => {
  const {
    loading,
    error,
    data: { explore } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(EXPLORE_QUERY, {
    variables: { id: query.id },
  });

  if (!explore) return null;

  if (explore.length === 0) return <span>No posts found.</span>;

  return (
    <Wrapper>
      <h1>Explore.</h1>
      {explore.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </Wrapper>
  );
};

export default ExplorePage;
