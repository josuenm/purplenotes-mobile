import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { Box, Flex, IconButton, Text } from "native-base";
import { TouchableOpacity } from "react-native";

interface ItemProps {
  title: string;
  children: React.ReactNode;
}

function Item({ title, children }: ItemProps) {
  return (
    <TouchableOpacity activeOpacity={0.3}>
      <Box alignItems="center" px={2}>
        {children}
        <Text>{title}</Text>
      </Box>
    </TouchableOpacity>
  );
}

export default function BottomNavigation() {
  return (
    <Flex
      w="full"
      px={5}
      py={1}
      position="absolute"
      bottom={0}
      direction="row"
      justifyContent="space-between"
      bgColor="rgba(238, 238, 238, .8)"
      borderTopWidth={1}
      borderTopColor="#ddd"
    >
      <Item title="Home">
        <Octicons name="home" size={24} color="black" />
      </Item>

      <IconButton
        borderRadius="full"
        bgColor="violet.500"
        justifyContent="center"
        p={3}
        style={{ transform: [{ translateY: -20 }] }}
        _pressed={{
          opacity: 0.7,
        }}
        icon={<AntDesign name="plus" size={24} color="white" />}
      />

      <Item title="Settings">
        <Ionicons name="settings-outline" size={24} color="black" />
      </Item>
    </Flex>
  );
}
