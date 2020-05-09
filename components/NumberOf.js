import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 1.6rem;
  line-height: 1.8rem;
  cursor: ${({ disableClick }) => (disableClick ? "auto" : "pointer")};
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  color: #999;
  @media (min-width: 736px) {
    display: block;
    color: var(--color-black);
  }
`;

const Number = styled.span`
  font-weight: bold;
  color: var(--color-black);
`;

const NumberOf = ({ name, length, clickHandler }) => {
  return (
    <Wrapper
      onClick={clickHandler}
      disableClick={typeof clickHandler === "undefined"}
    >
      <Number>{length || 0}</Number> {name}
    </Wrapper>
  );
};

export default NumberOf;
