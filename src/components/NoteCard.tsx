import { Box, Button, Heading, Text, VStack } from "native-base";
import { useContext } from "react";
import { NotesContext } from "../contexts/notesContext";
import { NoteProps } from "../types/NoteProps";
import * as RootNavigation from "../utils/RootNavigation";

export default function NoteCard({ note }: { note: NoteProps }) {
  const { Delete } = useContext(NotesContext);

  const formatedTitle = (title: string) => {
    if (title.length >= 20) {
      return title.substring(0, 20) + "...";
    }
    return title;
  };

  const formatedBody = (body: string) => {
    let newBody = body.replace(/<(.|\n)*?>/gi, "").slice(0, 20);

    if (newBody.length >= 20) {
      return newBody.substring(0, 20) + "...";
    }
    return newBody;
  };

  function Navigate() {
    RootNavigation.navigate("EditNote", {
      id: note._id,
    });
  }

  return (
    <Box borderWidth={1} borderColor="gray.500" p={5} borderRadius="lg">
      <Heading>{formatedTitle(note.title)}</Heading>
      <Text>{formatedBody(note.body)}</Text>

      <VStack space={4} mt={5}>
        <Button colorScheme="violet" onPress={Navigate}>
          <Text color="white" fontWeight={500}>
            Access
          </Text>
        </Button>
        <Button colorScheme="red" onPress={() => Delete(note._id)}>
          <Text color="white" fontWeight={500}>
            Delete
          </Text>
        </Button>
      </VStack>
    </Box>
  );
}
