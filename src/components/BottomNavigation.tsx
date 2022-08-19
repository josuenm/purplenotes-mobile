import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { Box, Flex, Text } from "native-base";

interface ItemProps {
  title: string;
  children: React.ReactNode;
}

function Item({ title, children }: ItemProps) {
  return (
    <Box alignItems="center">
      {children}
      <Text>{title}</Text>
    </Box>
  );
}

export default function BottomNavigation() {
  return (
    <Flex
      w="full"
      px={5}
      py={2}
      position="absolute"
      bottom={0}
      direction="row"
      justifyContent="space-between"
    >
      <Item title="Home">
        <Octicons name="home" size={24} color="black" />
      </Item>

      <Box
        borderRadius="full"
        bgColor="violet.500"
        justifyContent="center"
        p={2}
      >
        <AntDesign name="plus" size={24} color="black" />
      </Box>

      <Item title="Settings">
        <Ionicons name="settings-outline" size={24} color="black" />
      </Item>
    </Flex>
  );
}
