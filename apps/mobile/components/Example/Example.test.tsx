import { render, screen, fireEvent } from "@testing-library/react-native";
import Example from "./Example";

describe("Example Component", () => {
  it("renders correctly", () => {
    render(<Example />);
    const element = screen.getByText("Hello, World!");
    expect(element).toBeTruthy();
  });

  it("handles press events", () => {
    const onPressMock = jest.fn();
    render(<Example onPress={onPressMock} />);

    const button = screen.getByText("Press Me");
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
