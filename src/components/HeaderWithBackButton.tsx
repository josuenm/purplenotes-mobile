import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button } from "native-base";
import * as RootNavigation from "../utils/RootNavigation";

interface HeaderProps {
  returnTo: string;
}

export default function HeaderWithBackButton({ returnTo }: HeaderProps) {
  function Navigate() {
    RootNavigation.navigate(returnTo);
  }

  return (
    <Box
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      pt={34}
    >
      <Button
        w={42}
        variant="unstyled"
        borderRadius="full"
        _pressed={{
          bgColor: "rgba(218,218,218,.5)",
        }}
        onPress={Navigate}
      >
        <MaterialIcons name="arrow-back-ios" size={27} color="black" />
      </Button>
    </Box>
  );
}
