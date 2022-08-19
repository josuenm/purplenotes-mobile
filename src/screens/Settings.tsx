import { Box, Button, FlatList, Heading, Link, Text } from "native-base";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import HeaderWithBackButton from "../components/HeaderWithBackButton";
import { UserContext, UserContextProps } from "../contexts/userContext";

interface FlatListData {
  title: string;
}

export default function Settings() {
  const data = [
    {
      title: "Account information",
    },
  ];

  const { Exit } = useContext(UserContext) as UserContextProps;

  return (
    <>
      <HeaderWithBackButton returnTo="Dashboard" />
      <Box
        flex={1}
        bgColor="#eee"
        flexDirection="column"
        justifyContent="space-between"
        px={5}
      >
        <FlatList
          bgColor="#eee"
          mt={5}
          data={data as FlatListData[]}
          renderItem={({ item }: { item: FlatListData }) => (
            <TouchableOpacity activeOpacity={0.3}>
              <Box py={4} borderBottomWidth={1} borderColor="#ddd">
                <Text fontSize={16} fontWeight={600}>
                  {item.title}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(index: any) => index}
        />
        <Box
          w="full"
          justifyContent="center"
          py={3}
          borderTopColor="#ddd"
          borderTopWidth={1}
        >
          <Button colorScheme="violet" mx="auto" px={12} mb={5} onPress={Exit}>
            <Heading fontSize={16} color="white">
              Quit
            </Heading>
          </Button>

          <Box flexDirection="row" justifyContent="center">
            <Text color="gray.400">Feito por </Text>
            <Link href="https://josuenm-portfolio.vercel.app">
              Josué Mendonça
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
