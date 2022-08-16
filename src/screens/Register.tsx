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

interface RegisterProps {
  navigation: {
    navigate: (value: string) => void;
  };
}

export default function Register({ navigation }: RegisterProps) {
  const logo = require("../../assets/logo.png");

  return (
    <Center flex={1} paddingX={5}>
      <Image source={logo} alt="Logo" size="md" w="full" mb={5} />
      <Stack w="full" space={5}>
        <InputGroup flexDirection="column">
          <Text fontSize={18}>Name:</Text>
          <Input
            type="text"
            bg="gray.50"
            _focus={{
              bg: "purple.50",
              borderColor: "purple.400",
            }}
            fontSize={14}
            placeholder="Type your name"
          />
        </InputGroup>

        <InputGroup flexDirection="column">
          <Text fontSize={18}>E-mail:</Text>
          <Input
            type="email"
            bg="gray.50"
            _focus={{
              bg: "purple.50",
              borderColor: "purple.400",
            }}
            fontSize={14}
            placeholder="Type your email"
          />
        </InputGroup>

        <InputGroup flexDirection="column">
          <Text fontSize={18}>Password:</Text>
          <Input
            type="password"
            bg="gray.50"
            _focus={{
              bg: "purple.50",
              borderColor: "purple.400",
            }}
            fontSize={14}
            placeholder="Type your password"
          />
        </InputGroup>

        <Button colorScheme="purple">
          <Text fontSize={18} color="white">
            Register
          </Text>
        </Button>

        <Divider my={2} />

        <Button
          variant="outline"
          borderColor="purple.500"
          onPress={() => navigation.navigate("Login")}
        >
          <Text fontSize={18} color="purple.500">
            Login
          </Text>
        </Button>
      </Stack>
    </Center>
  );
}
