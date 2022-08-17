import { Button, Text } from "native-base";

interface ButtonProps {
  children: string;
  onPress?: () => void;
}

export function NormalButton({ children, ...rest }: ButtonProps) {
  return (
    <Button colorScheme="violet" {...rest}>
      <Text fontSize={18} color="white">
        {children}
      </Text>
    </Button>
  );
}

export function OutlineButton({ children, ...rest }: ButtonProps) {
  return (
    <Button variant="outline" borderColor="violet.600" w="full" {...rest}>
      <Text fontSize={18} color="violet.600">
        {children}
      </Text>
    </Button>
  );
}
