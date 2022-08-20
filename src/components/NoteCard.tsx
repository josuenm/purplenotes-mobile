import { Box, Button, Heading, Text, VStack } from "native-base";
import { useContext } from "react";
import { NotesContext, NotesContextProps } from "../contexts/notesContext";
import { NotesProps } from "../types/NoteProps";

export default function NoteCard({ note }: { note: NotesProps }) {
  const { Delete } = useContext(NotesContext) as NotesContextProps;

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

  return (
    <Box borderWidth={1} borderColor="gray.500" p={5} borderRadius="lg">
      <Heading>{formatedTitle(note.title)}</Heading>
      <Text>{formatedBody(note.body)}</Text>

      <VStack space={4} mt={5}>
        <Button colorScheme="violet">
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
