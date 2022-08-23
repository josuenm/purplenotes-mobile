import {
  Button,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { NormalButton } from "../components/Buttons";
import HeaderWithBackButton from "../components/HeaderWithBackButton";
import { UserContext, UserContextProps } from "../contexts/userContext";

interface BasicInfoProps {
  name: string;
  email: string;
}

interface PasswordInfoProps {
  password: string;
  passwordConfirmation: string;
}

function EditBasicInfo() {
  const { user, UpdateBasicInfo } = useContext(UserContext) as UserContextProps;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoProps>({
    defaultValues: useMemo(() => {
      return {
        name: user?.name,
        email: user?.email,
      };
    }, []),
  });

  const onSubmit = (data: BasicInfoProps) => {
    Keyboard.dismiss();

    if (data.name === user?.name && data.email === user?.email) {
      return;
    }

    UpdateBasicInfo(data);
  };

  return (
    <VStack w="full" space={5}>
      <Heading textAlign="center">Basic Information</Heading>

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

      <NormalButton onPress={handleSubmit(onSubmit)}>Save</NormalButton>
    </VStack>
  );
}

function EditPassword() {
  const { UpdatePassword } = useContext(UserContext) as UserContextProps;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PasswordInfoProps>();
  const onSubmit = (data: PasswordInfoProps) => {
    Keyboard.dismiss();

    const response = UpdatePassword(data.password) as boolean | void;
    if (response) {
      setValue("password", "");
      setValue("passwordConfirmation", "");
    }
  };

  let password = watch("password");

  return (
    <VStack w="full" space={5}>
      <Heading textAlign="center">Password Information</Heading>

      <FormControl isRequired isInvalid={"password" in errors}>
        <FormControl.Label>New password:</FormControl.Label>
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
              placeholder="Type your new password"
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.password?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={"passwordConfirmation" in errors}>
        <FormControl.Label>New password confirmation:</FormControl.Label>
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
              type="passwordConfirmation"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Type your new password again"
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.passwordConfirmation?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <NormalButton onPress={handleSubmit(onSubmit)}>Save</NormalButton>
    </VStack>
  );
}

function DeleteButton() {
  const { Delete } = useContext(UserContext) as UserContextProps;

  return (
    <Button colorScheme="red" py={3} onPress={Delete}>
      <Text fontWeight={500} color="white">
        Delete Account
      </Text>
    </Button>
  );
}

export default function AccountInformation() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} px={5}>
      <HeaderWithBackButton returnTo="Settings" />
      <VStack space={12} pt={12} pb={16}>
        <EditBasicInfo />
        <EditPassword />
        <DeleteButton />
      </VStack>
    </ScrollView>
  );
}
