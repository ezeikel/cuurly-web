import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reset from '../components/Reset';
import FormWrapper from '../components/styles/FormWrapper';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 16px;
    line-height: 24px;
  }
`;


const Copy = styled.span`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #999999;
`;

const StyledFormWrapper = styled(FormWrapper)`
  justify-items: center;
`;

const resetPage = ({ query }) => (
  <Wrapper>
    <StyledFormWrapper>
      <FontAwesomeIcon
        icon={["fal", "key"]}
        color="var(--color-black)"
        size="3x"
      />
      <h1>Set New Password</h1>
      <Copy>Enter your new password and we'll get you back into your account in no time!</Copy>
      <Reset resetToken={query.resetToken} />
    </StyledFormWrapper>
  </Wrapper>
);

export default resetPage;
