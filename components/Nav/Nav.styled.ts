import styled from "styled-components";

export const Wrapper = styled.nav`
  width: 100%;
  /* max-width: ${({ theme }) => theme.default.maxWidth}; */
  font-family: var(--default-font-family);
  font-style: normal;
  /* color: ${({ theme }) => theme.default.textColor}; */
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: var(--spacing-large);
  align-content: center;
  justify-items: center;
  padding: var(--spacing-medium);
  @media (min-width: 736px) {
    grid-template-columns: auto 4fr auto 1fr;
  }
`;

export const NavActions = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: var(--spacing-medium);
  align-items: center;
  justify-items: center;
  font-size: 1.8rem;
  @media (min-width: 736px) {
    grid-column-gap: var(--spacing-large);
  }
`;

export const LogoWrapper = styled.div`
  display: grid;
  grid-template-columns: 32px 120px;
  grid-column-gap: var(--spacing-small);
  align-items: center;
  a {
    height: 32px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Upload = styled.div`
  display: grid;
  justify-self: end;
`;
