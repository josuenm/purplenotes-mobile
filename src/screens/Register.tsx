import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Center,
  Divider,
  FormControl,
  Image,
  Input,
  Stack,
  Text,
} from "native-base";

interface RegisterProps {
  navigation: {
    navigate: (value: string) => void;
  };
}

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function Register({ navigation }: RegisterProps) {
  const logo = require("../../assets/logo.png");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <Center flex={1} paddingX={5}>
      <Image source={logo} alt="Logo" size="md" w="full" mb={5} />
      <Stack w="full" space={5}>
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label>Name:</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: "Field is required",
            }}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Type your name"
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.name?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={"email" in errors}>
          <FormControl.Label>Email:</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: "Field is required",
              maxLength: { value: 5, message: "Invalid email" },
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Type your email"
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={"password" in errors}>
          <FormControl.Label>Password:</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: "Field is required",
            }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Type your password"
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button colorScheme="violet">
          <Text fontSize={18} color="white">
            Register
          </Text>
        </Button>

        <Divider my={2} />

        <Button
          variant="outline"
          borderColor="violet.600"
          onPress={() => navigation.navigate("Login")}
        >
          <Text fontSize={18} color="violet.600">
            Login
          </Text>
        </Button>
      </Stack>
    </Center>
  );
}
