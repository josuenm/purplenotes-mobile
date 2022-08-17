import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Center,
  Divider,
  Image,
  FormControl,
  Stack,
  Text,
} from "native-base";
import { Input } from "../components/Input";

interface LoginProps {
  navigation: {
    navigate: (value: string) => void;
  };
}

interface IFormInputs {
  email: string;
  password: string;
}

export default function Login({ navigation }: LoginProps) {
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
        <FormControl isRequired isInvalid={"email" in errors}>
          <FormControl.Label>Email:</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: "Field is required",
              minLength: { value: 5, message: "Invalid email" },
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="email"
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
                type="password"
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

        <Button colorScheme="violet" onPress={handleSubmit(onSubmit)}>
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
