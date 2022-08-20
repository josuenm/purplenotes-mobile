import { FormControl, Heading, Input, ScrollView, Stack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { NormalButton } from "../components/Buttons";
import HeaderWithBackButton from "../components/HeaderWithBackButton";

interface BasicInfoProps {
  name: string;
  email: string;
}

interface PasswordInfoProps {
  password: string;
  passwordConfirmation: string;
}

function EditBasicInfo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoProps>();
  const onSubmit = (data: BasicInfoProps) => {
    Keyboard.dismiss();
  };

  return (
    <Stack w="full" space={5}>
      <Heading textAlign="center">Basic Information</Heading>

      <FormControl isRequired>
        <FormControl.Label>Name:</FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: "Field is required",
            minLength: { value: 5, message: "Invalid name" },
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
        <FormControl.ErrorMessage></FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired>
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
        <FormControl.ErrorMessage></FormControl.ErrorMessage>
      </FormControl>

      <NormalButton>Save</NormalButton>
    </Stack>
  );
}

function EditPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordInfoProps>();
  const onSubmit = (data: PasswordInfoProps) => {
    Keyboard.dismiss();
  };

  return (
    <Stack w="full" space={5}>
      <Heading textAlign="center">Password Information</Heading>

      <FormControl isRequired>
        <FormControl.Label>Password:</FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: "Field is required",
            minLength: { value: 5, message: "Invalid email" },
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
        <FormControl.ErrorMessage></FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label>Password Confirmation:</FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: "Field is required",
            minLength: { value: 5, message: "Invalid email" },
          }}
          name="passwordConfirmation"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="passwordConfirmation"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Type your password again"
            />
          )}
        />
        <FormControl.ErrorMessage></FormControl.ErrorMessage>
      </FormControl>

      <NormalButton>Save</NormalButton>
    </Stack>
  );
}

export default function AccountInformation() {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} px={5}>
        <HeaderWithBackButton returnTo="Settings" />
        <Stack space={12} pt={12} pb={16}>
          <EditBasicInfo />
          <EditPassword />
        </Stack>
      </ScrollView>
    </>
  );
}
