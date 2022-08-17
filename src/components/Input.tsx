import { Input as NativeBaseInput } from "native-base";
import { Noop } from "react-hook-form";

interface InputProps {
  type?: string;
  placeholder?: string;
  onBlur: Noop;
  onChangeText: (...event: any[]) => void;
  value: any;
}

export function Input({
  type,
  placeholder,
  onBlur,
  onChangeText,
  value,
}: InputProps) {
  return (
    <NativeBaseInput
      type={type}
      placeholder={placeholder}
      fontSize={14}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
      bg="gray.50"
      _focus={{
        bg: "violet.50",
        borderColor: "violet.400",
      }}
    />
  );
}
