import { Text } from "native-base";

export default function Label({ children }: { children: string }) {
  return <Text fontSize={16}>{children}</Text>;
}
