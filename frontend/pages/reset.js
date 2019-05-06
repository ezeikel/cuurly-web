import styled from 'styled-components';
import Reset from '../components/Reset';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 22px;
  }
`;

const requestResetPage = () => (
  <Wrapper>
    <h1>Forgot your password?</h1>
    <Reset />
  </Wrapper>
);

export default requestResetPage;
