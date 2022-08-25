import { Divider, FormControl, Image, VStack } from "native-base";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { NormalButton, OutlineButton } from "../components/Buttons";
import { Input } from "../components/Input";
import ScreenContainer from "../components/ScreenContainer";
import { UserContext } from "../contexts/userContext";

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

  const { Login } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => {
    Keyboard.dismiss();
    Login({ email: data.email.replace(/\s/g, ""), password: data.password });
  };

  return (
    <ScreenContainer justifyContent="center">
      <Image source={logo} alt="Logo" size="md" w="full" mb={5} />
      <VStack w="full" space={5}>
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

        <NormalButton onPress={handleSubmit(onSubmit)}>Login</NormalButton>

        <Divider my={2} />

        <OutlineButton onPress={() => navigation.navigate("Register")}>
          Register
        </OutlineButton>
      </VStack>
    </ScreenContainer>
  );
}
