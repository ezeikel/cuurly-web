import { FunctionComponent } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RequestReset from "../components/RequestReset/RequestReset";

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

const StyledFormWrapper = styled.div`
  justify-items: center;
`;

const requestResetPage: FunctionComponent = () => (
  <Wrapper>
    <StyledFormWrapper>
      <FontAwesomeIcon
        icon={["fal", "lock"]}
        color="var(--color-black)"
        size="3x"
      />
      <h1>Trouble Logging In?</h1>
      <Copy>
        Enter your email address and we&apos;ll send you a link to reset your
        password and get back into your account.
      </Copy>
      <RequestReset />
    </StyledFormWrapper>
  </Wrapper>
);

export default requestResetPage;
