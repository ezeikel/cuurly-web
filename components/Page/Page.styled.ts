import styled from "styled-components";

type StyledPageProps = {
  pathname: string;
  theme: any;
};

type InnerProps = {
  theme: any;
};

export const StyledPage = styled.div<StyledPageProps>`
  display: grid;
  grid-template-rows: ${({ pathname }) =>
    pathname === "/" || pathname === "/sign-in" ? `1fr` : `80px 1fr`};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.default.white};
  color: ${({ theme }) => theme.default.textColor};
`;

export const Wrapper = styled.div`
  background-color: #fafafa;
`;

export const Inner = styled.main<InnerProps>`
  max-width: ${({ theme }) => theme.default.maxWidth};
  margin: 0 auto;
  width: 100%;
`;
