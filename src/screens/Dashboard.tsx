import { Heading, Image, ScrollView, VStack } from "native-base";
import { useContext, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import NoteCard from "../components/NoteCard";
import ScreenContainer from "../components/ScreenContainer";
import { NotesContext, NotesContextProps } from "../contexts/notesContext";
import { NotesProps } from "../types/NoteProps";

export default function Dashboard() {
  const { List, notes } = useContext(NotesContext) as NotesContextProps;

  useEffect(() => {
    List();
  }, []);

  return (
    <>
      <ScrollView bgColor="#eee">
        <ScreenContainer pt={16}>
          <Heading fontSize={21} fontWeight={700}>
            Notes:
          </Heading>
          <VStack mt={5} mb={24} space={5}>
            {notes.length > 0 ? (
              notes.map((note: NotesProps) => (
                <NoteCard note={note} key={note._id} />
              ))
            ) : (
              <Image
                source={require("../../assets/images/nothing-to-list.png")}
                alt="Nothing to list"
                size="2xl"
                mx="auto"
              />
            )}
          </VStack>
        </ScreenContainer>
      </ScrollView>
      <BottomNavigation />
    </>
  );
}
