import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, FlatList, Heading, Link, Text } from "native-base";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import HeaderWithBackButton from "../components/HeaderWithBackButton";
import ScreenContainer from "../components/ScreenContainer";
import { UserContext } from "../contexts/userContext";
import * as RootNavigation from "../utils/RootNavigation";

interface FlatListData {
  title: string;
  routeName: string;
}

export default function Settings() {
  const data = [
    {
      title: "User information",
      routeName: "UserInformation",
    },
    {
      title: "About App",
      routeName: "AboutApp",
    },
  ];

  const { Exit } = useContext(UserContext);

  function Navigate(route: string) {
    RootNavigation.navigate(route);
  }

  return (
    <>
      <ScreenContainer flexDirection="column" justifyContent="space-between">
        <HeaderWithBackButton returnTo="Dashboard" />
        <FlatList
          bgColor="#eee"
          mt={5}
          data={data as FlatListData[]}
          renderItem={({ item }: { item: FlatListData }) => (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => Navigate(item.routeName)}
            >
              <Box
                py={4}
                borderBottomWidth={1}
                borderColor="#ddd"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize={16} fontWeight={600}>
                  {item.title}
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.routeName}
        />
        <Box
          w="full"
          justifyContent="center"
          py={5}
          borderTopColor="#ddd"
          borderTopWidth={1}
        >
          <Button colorScheme="violet" mx="auto" px={12} mb={5} onPress={Exit}>
            <Heading fontSize={16} color="white">
              Quit
            </Heading>
          </Button>

          <Box flexDirection="row" justifyContent="center">
            <Text color="gray.400">Aplicativo feito por </Text>
            <Link href="https://josuenm-portfolio.vercel.app">
              Josué Mendonça
            </Link>
          </Box>
        </Box>
      </ScreenContainer>
    </>
  );
}
