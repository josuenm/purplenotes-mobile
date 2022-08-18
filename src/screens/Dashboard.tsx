import { Box, Button, Center, ScrollView, Text } from "native-base";
import { useContext } from "react";
import { NotesContext, NotesContextProps } from "../contexts/notesContext";

export default function Dashboard() {
  const { List } = useContext(NotesContext) as NotesContextProps;

  return (
    <ScrollView>
      <Box bg="violet.600" w="full" h={80}>
        <Center flex={1}>
          <Button bg="white" _pressed={{ bg: "gray.200" }} onPress={List}>
            <Text fontSize={22} color="black" px={10}>
              Create note
            </Text>
          </Button>
        </Center>
      </Box>
      <Box p={5}>
        <Text fontSize={21} fontWeight="bold">
          Notes:
        </Text>
      </Box>
    </ScrollView>
  );
}
