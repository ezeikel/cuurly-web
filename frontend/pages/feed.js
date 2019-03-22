import styled from 'styled-components';
import { Query } from "react-apollo";
import { FEED_QUERY } from "../apollo/queries";

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const FeedPage = ({ query }) => (
  <Query query={ FEED_QUERY } variables={{ id: query.id }}>
    {({ data: { feed }, error, loading }) => {
      return (
      <Wrapper>
        <h1>Feed.</h1>
        {
          feed.map(post => (
            <Post id={post.id}/>
          ))
        }
      </Wrapper>
      );
    }}
  </Query>
);

export default FeedPage;