import { Text, Pressable, View } from "react-native";

interface ExampleProps {
  onPress?: () => void;
}

export default function Example({ onPress }: ExampleProps) {
  return (
    <View>
      <Text>Hello, World!</Text>
      <Pressable onPress={onPress}>
        <Text>Press Me</Text>
      </Pressable>
    </View>
  );
}
