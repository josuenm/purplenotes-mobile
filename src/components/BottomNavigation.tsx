import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Box, IconButton, Text } from "native-base";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { NotesContext, NotesContextProps } from "../contexts/notesContext";
import * as RootNavigation from "../utils/RootNavigation";

interface ItemProps {
  title: string;
  routeName: string;
  iconName: string;
}

function Item({ title, routeName, iconName }: ItemProps) {
  const route = useRoute();

  const isActive = routeName === route.name;

  function Navigate() {
    RootNavigation.navigate(routeName);
  }

  return (
    <TouchableOpacity activeOpacity={0.3} onPress={Navigate}>
      <Box alignItems="center" px={3}>
        <Ionicons
          name={iconName as any}
          size={20}
          color={isActive ? "#7c3aed" : "black"}
        />
        <Text color={isActive ? "#7c3aed" : "black"} fontWeight={400}>
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}

function AddButton() {
  const { Create } = useContext(NotesContext) as NotesContextProps;

  return (
    <IconButton
      borderRadius="full"
      bgColor="violet.600"
      icon={<AntDesign name="plus" size={24} color="white" />}
      p={3}
      translateY={-20}
      _pressed={{ opacity: 0.7 }}
      onPress={Create}
    />
  );
}

export default function BottomNavigation() {
  return (
    <Box
      position="absolute"
      bottom={0}
      w="full"
      borderTopWidth={1}
      borderTopColor="#ddd"
      flexDirection="row"
      justifyContent="space-between"
      px={5}
      py={1}
      bgColor="rgba(238, 238, 238, .9)"
    >
      <Item title="Home" routeName="Dashboard" iconName="home-outline" />
      <AddButton />
      <Item
        title="Settings"
        routeName="Settings"
        iconName="md-settings-outline"
      />
    </Box>
  );
}
