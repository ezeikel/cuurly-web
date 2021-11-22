import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

export default {
  component: Button,
  title: "Components/Button",
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: "Button",
};
