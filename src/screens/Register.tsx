import { Divider, FormControl, Image, Input, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { NormalButton, OutlineButton } from "../components/Buttons";
import ScreenContainer from "../components/ScreenContainer";
import userApi from "../services/userApi";

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
  const onSubmit = (data: IFormInputs) => {
    Keyboard.dismiss();

    userApi.register({
      name: data.name,
      email: data.email.replace(/\s/g, ""),
      password: data.password,
    });
  };

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

        <NormalButton onPress={handleSubmit(onSubmit)}>Register</NormalButton>

        <Divider my={2} />

        <OutlineButton onPress={() => navigation.navigate("Login")}>
          Login
        </OutlineButton>
      </VStack>
    </ScreenContainer>
  );
}
