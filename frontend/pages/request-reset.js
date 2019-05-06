import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
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

const requestResetPage = () => (
  <Wrapper>
    <FormWrapper>
      <h1>Forgot your password?</h1>
      <RequestReset />
    </FormWrapper>
  </Wrapper>
);

export default requestResetPage;