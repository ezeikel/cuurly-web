import { InputHTMLAttributes, ReactElement } from "react";
import { useField } from "formik";
import { Wrapper, Input, Label } from "./TexrInput.styled";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helpText?: string;
  noErrorState?: boolean;
  initialFocus?: boolean;
  name: string;
};

const TextInput = ({
  id,
  label,
  name,
  className,
  ...props
}: TextInputProps): ReactElement => {
  const [field, meta] = useField({ ...props, name });

  return (
    <Wrapper>
      <Input
        dirty={meta.touched && field.value.length > 0}
        {...field} // eslint-disable-line react/jsx-props-no-spreading
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      />
      {label && <Label htmlFor={id || name}>{label}</Label>}
    </Wrapper>
  );
};

export default TextInput;
