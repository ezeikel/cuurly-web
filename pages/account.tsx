import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Account from "../components/Account";

const Wrapper = styled.div`
  display: grid;
  padding: var(--padding-page-wrap);
`;

const AccountPage: FunctionComponent = () => {
  const router = useRouter();
  const { mode } = router.query;

  return (
    <Wrapper>
      <Account mode={mode} />
    </Wrapper>
  );
};

export default AccountPage;
