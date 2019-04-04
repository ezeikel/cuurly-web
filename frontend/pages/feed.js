import styled from 'styled-components';
import { Query } from "react-apollo";
import { FEED_QUERY } from "../apollo/queries";
import Post from '../components/Post';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 614px;
  justify-content: center;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const FeedPage = ({ query }) => (
  <Query query={ FEED_QUERY } variables={{ id: query.id }}>
    {({ data: { feed }, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
      <Wrapper>
        {
          feed.map(post => (
            <Post key={post.id} id={post.id}/>
          ))
        }
      </Wrapper>
      );
    }}
  </Query>
);

export default FeedPage;