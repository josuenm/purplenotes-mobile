import { Center, Spinner } from "native-base";

export function SpinnerLoading() {
  return (
    <Center
      position="absolute"
      w="full"
      h="full"
      flex={1}
      zIndex={2}
      backgroundColor="rgba(255,255,255,.9)"
    >
      <Spinner size="lg" color="violet.500" />
    </Center>
  );
}
