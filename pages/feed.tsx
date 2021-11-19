import { useContext, FunctionComponent } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../apollo/queries";
import Post from "../components/Post/Post";
import { AuthContext } from "../contexts/auth";

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

const FeedPage: FunctionComponent = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  const {
    data: { feed } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(FEED_QUERY, {
    variables: { id: currentUser.id },
    skip: currentUser === null, // wait for currentUser query before executing this one - https://github.com/apollographql/react-apollo/issues/3624#issuecomment-545990545
  });

  if (!feed) return null;

  if (feed.length === 0) return <span>No posts found.</span>;

  return (
    <Wrapper>
      {feed.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </Wrapper>
  );
};

export default FeedPage;
