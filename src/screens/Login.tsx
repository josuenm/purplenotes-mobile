import {
  Button,
  Center,
  Divider,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
} from "native-base";
import Label from "../components/Label";

interface LoginProps {
  navigation: {
    navigate: (value: string) => void;
  };
}

export default function Login({ navigation }: LoginProps) {
  const logo = require("../../assets/logo.png");

  return (
    <Center flex={1} paddingX={5}>
      <Image source={logo} alt="Logo" size="md" w="full" mb={5} />
      <Stack w="full" space={5}>
        <InputGroup flexDirection="column">
          <Label>Email:</Label>
          <Input
            type="email"
            bg="gray.50"
            _focus={{
              bg: "violet.50",
              borderColor: "violet.400",
            }}
            fontSize={14}
            placeholder="Type your email"
          />
        </InputGroup>

        <InputGroup flexDirection="column">
          <Label>Password:</Label>
          <Input
            type="password"
            bg="gray.50"
            _focus={{
              bg: "violet.50",
              borderColor: "violet.400",
            }}
            fontSize={14}
            placeholder="Type your password"
          />
        </InputGroup>

        <Button colorScheme="violet">
          <Text fontSize={18} color="white">
            Login
          </Text>
        </Button>

        <Divider my={2} />

        <Button
          variant="outline"
          borderColor="violet.600"
          w="full"
          onPress={() => navigation.navigate("Register")}
        >
          <Text fontSize={18} color="violet.600">
            Register
          </Text>
        </Button>
      </Stack>
    </Center>
  );
}
