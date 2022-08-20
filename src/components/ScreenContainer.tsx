import { Box, StyledProps } from "native-base";

interface ScreenContainerProps {
  children?: React.ReactNode;
}

export default function ScreenContainer({
  children,
  ...rest
}: ScreenContainerProps & StyledProps) {
  return (
    <Box flex={1} px={5} {...rest} bgColor="#eee">
      {children}
    </Box>
  );
}
