import styled from 'styled-components';
import Reset from '../components/Reset';
import FormWrapper from '../components/styles/FormWrapper';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 22px;
  }
  
`;

const resetPage = ({ query }) => (
  <Wrapper>
    <FormWrapper>
      <h1>Forgot your password?</h1>
      <Reset resetToken={query.resetToken} />
    </FormWrapper>
  </Wrapper>
);

export default resetPage;
