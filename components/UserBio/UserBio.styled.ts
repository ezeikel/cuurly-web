import styled from "styled-components";

export const Wrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
  display: grid;
  grid-template-rows: repeat(3, auto);
  font-size: 1.6rem;
  line-height: 2.4rem;
  @media (min-width: 736px) {
    grid-column: 2 / -1;
    grid-row: 3 / span 1;
  }
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Website = styled.span`
  a {
    color: #003569;
  }
`;
