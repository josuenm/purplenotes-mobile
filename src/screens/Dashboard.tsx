import { Box, ScrollView, Text } from "native-base";
import { useContext } from "react";
import { NotesContext, NotesContextProps } from "../contexts/notesContext";

export default function Dashboard() {
  const { List, notes } = useContext(NotesContext) as NotesContextProps;

  return (
    <ScrollView>
      <Box pt={20} px={5}>
        <Text fontSize={21} fontWeight="bold">
          Notes:
        </Text>
        {notes.length > 0 ? (
          <Text fontSize={21} textAlign="center" fontWeight="medium">
            List
          </Text>
        ) : (
          <Text fontSize={21} textAlign="center" fontWeight="medium">
            Nothing to list
          </Text>
        )}
      </Box>
    </ScrollView>
  );
}
