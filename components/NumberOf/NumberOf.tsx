import { Wrapper, Number } from "./NumberOf.styled";

type NumberOfProps = {
  name: string;
  length: number;
  clickHandler?: () => void;
};

const NumberOf = ({ name, length, clickHandler }: NumberOfProps) => {
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
