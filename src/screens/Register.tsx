import { Divider, FormControl, Image, VStack } from "native-base";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { NormalButton, OutlineButton } from "../components/Buttons";
import { Input } from "../components/Input";
import ScreenContainer from "../components/ScreenContainer";
import { UserContext, UserContextProps } from "../contexts/userContext";

interface RegisterProps {
  navigation: {
    navigate: (value: string) => void;
  };
}

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function Register({ navigation }: RegisterProps) {
  const logo = require("../../assets/logo.png");

  const { Register } = useContext(UserContext) as UserContextProps;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => {
    Keyboard.dismiss();

    Register({
      name: data.name,
      email: data.email.replace(/\s/g, ""),
      password: data.password,
    });
  };

  const password = watch("password");

  return (
    <ScreenContainer justifyContent="center">
      <Image source={logo} alt="Logo" size="md" w="full" mb={5} />
      <VStack w="full" space={5}>
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
              pattern: {
                message: "Invalid email",
                value: /^\b[A-Z0-9._%]+@[A-Z0-9*-]+\.[A-Z]{2,4}\b$/i,
              },
              minLength: { value: 1, message: "Invalid password" },
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
              minLength: { value: 1, message: "Invalid password" },
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

        <FormControl isRequired isInvalid={"passwordConfirmation" in errors}>
          <FormControl.Label>Password confirmation:</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: "Field is required",
              validate: (value) =>
                value === password || "The passwords do not match",
              minLength: { value: 1, message: "Invalid password" },
            }}
            name="passwordConfirmation"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Type your password again"
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.passwordConfirmation?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <NormalButton onPress={handleSubmit(onSubmit)}>Register</NormalButton>

        <Divider my={2} />

        <OutlineButton onPress={() => navigation.navigate("Login")}>
          Login
        </OutlineButton>
      </VStack>
    </ScreenContainer>
  );
}
