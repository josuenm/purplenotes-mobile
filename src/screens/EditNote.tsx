import { Box, KeyboardAvoidingView, ScrollView } from "native-base";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
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

  const { Update } = useContext(NotesContext) as NotesContextProps;
  const timeout = useRef<NodeJS.Timeout | null>(null);
  function handleOnChange(data: string) {
    setContent(data);
    clearTimeout(timeout.current as NodeJS.Timeout);

    timeout.current = setTimeout(() => Update(route.params.id, data), 2000);
  }

  return (
    <>
      <Box px={5}>
        <HeaderWithBackButton returnTo="Dashboard" />
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        <ScrollView flex={1} mt={10} mb={12} px={5}>
          <RichEditor
            ref={richText as any}
            onChange={(descriptionText) => {
              handleOnChange(descriptionText);
            }}
            style={{
              width: "100%",
              borderRadius: 24,
            }}
            initialContentHTML={content}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
            actions.insertLink,
            actions.insertOrderedList,
            actions.insertBulletsList,
            actions.undo,
            actions.redo,
          ]}
          style={{
            width: "100%",
            alignSelf: "center",
          }}
        />
      </Box>
    </>
  );
}
