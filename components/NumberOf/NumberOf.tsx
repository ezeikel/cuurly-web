import { Wrapper, Number } from "./NumberOf.styled";

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
