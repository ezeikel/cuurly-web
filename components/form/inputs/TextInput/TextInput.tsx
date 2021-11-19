import { useField } from "formik";
import { Wrapper, Input, Label } from "./TexrInput.styled";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Wrapper>
      <Input
        dirty={meta.touched && field.value.length > 0}
        {...field}
        {...props}
      />
      <Label htmlFor={props.id || props.name}>{label}</Label>
    </Wrapper>
  );
};

export default TextInput;
