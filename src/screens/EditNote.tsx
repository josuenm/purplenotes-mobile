import { Box, ScrollView } from "native-base";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import HeaderWithBackButton from "../components/HeaderWithBackButton";
import { NotesContext, NotesContextProps } from "../contexts/notesContext";

interface RouteParams {
  params: {
    id: string;
  };
}

export default function EditNote({ route }: { route: RouteParams }) {
  const { FindById } = useContext(NotesContext) as NotesContextProps;

  const [content, setContent] = useState("");

  useEffect(() => {
    const currentNote = FindById(route.params.id);
    if (currentNote) {
      setContent(currentNote.body);
    }
  }, []);

  const richText = createRef() || useRef();

  return (
    <>
      <Box px={5}>
        <HeaderWithBackButton returnTo="Dashboard" />
      </Box>
      <ScrollView flex={1} pt={10} px={5}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, paddingBottom: 150 }}
        >
          <RichEditor
            ref={richText as any}
            onChange={(descriptionText) => {
              setContent(descriptionText);
            }}
            style={{
              width: "100%",
              borderRadius: 24,
            }}
            initialContentHTML={content}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Box position="absolute" bottom={0} w="full">
        <RichToolbar
          editor={richText}
          selectedIconTint="#7c3aed"
          iconTint="#000"
          actions={[
            actions.keyboard,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.checkboxList,
          ]}
          style={{
            alignSelf: "center",
          }}
        />
      </Box>
    </>
  );
}
