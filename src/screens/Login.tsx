import { Center, Divider, FormControl, Image, Stack } from "native-base";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { NormalButton, OutlineButton } from "../components/Buttons";
import { Input } from "../components/Input";
import { UserContext, UserContextProps } from "../contexts/userContext";

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

  const { Login } = useContext(UserContext) as UserContextProps;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => {
    Login({ email: data.email.replace(/\s/g, ""), password: data.password });
  };

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

        <NormalButton onPress={handleSubmit(onSubmit)}>Login</NormalButton>

        <Divider my={2} />

        <OutlineButton onPress={() => navigation.navigate("Register")}>
          Register
        </OutlineButton>
      </Stack>
    </Center>
  );
}
