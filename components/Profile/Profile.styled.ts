import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-large);
  padding: 30px 16px 24px;
  @media (min-width: 736px) {
    padding-top: 60px;
    grid-row-gap: var(--spacing-huge);
  }
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: repeat(2, auto) 1fr;
  grid-row-gap: var(--spacing-large);
  grid-column-gap: var(--spacing-large);
  @media (min-width: 736px) {
    grid-column-gap: var(--spacing-huge);
  }
`;

export const PostsWrapper = styled.div`
  display: grid;
`;

export const Posts = styled.ul`
  display: grid;
  grid-template: repeat(auto-fill, minmax(123px, 293px)) / 1fr;
  grid-gap: var(--spacing-tiny);
  @media (min-width: 736px) {
    justify-content: center;
    grid-template-columns: repeat(3, minmax(123px, 293px));
    grid-auto-rows: minmax(123px, 293px);
    grid-gap: var(--spacing-large);
  }
`;
