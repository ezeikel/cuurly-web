import styled from 'styled-components';
import { Query } from "react-apollo";
import { EXPLORE_QUERY } from "../apollo/queries";
import Post from '../components/Post';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const ExplorePage = ({ query }) => (
  <Query query={ EXPLORE_QUERY } variables={{ id: query.id }}>
    {({ data: { explore }, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        explore.length ?
          <Wrapper>
            <h1>Explore.</h1>
            {
              explore.map(post => (
                <Post key={post.id} id={post.id}/>
              ))
            }
          </Wrapper>
        : <span>No posts found.</span>
      );
    }}
  </Query>
);

export default ExplorePage;
