import { Box, Heading, ScrollView, Text } from "native-base";
import { useContext, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import { NotesContext, NotesContextProps } from "../contexts/notesContext";

export default function Dashboard() {
  const { List, notes } = useContext(NotesContext) as NotesContextProps;

  useEffect(() => {
    List();
  }, []);

  return (
    <>
      <ScrollView bgColor="#eee">
        <Box pt={20} px={5}>
          <Heading fontSize={21} fontWeight={700}>
            Notes:
          </Heading>
          {notes.length > 0 ? (
            <Text fontSize={21} textAlign="center" fontWeight={500}>
              List
            </Text>
          ) : (
            <Text fontSize={21} textAlign="center" fontWeight={500}>
              Nothing to list
            </Text>
          )}
        </Box>
      </ScrollView>
      <BottomNavigation />
    </>
  );
}
