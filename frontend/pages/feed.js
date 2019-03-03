import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const FeedPage = () => (
  <Wrapper>
    <h1>Your Feed.</h1>
  </Wrapper>
);

export default FeedPage;