import { createContext, useContext, useState } from "react";
import notesApi from "../services/notesApi";
import {
  GlobalToolsContext,
  GlobalToolsContextProps,
} from "./globalToolsContext";
import { UserContext, UserContextProps } from "./userContext";

interface ProviderProps {
  children: React.ReactNode;
}

type NotesProps = {};

export interface NotesContextProps {
  List: () => void;
  notes: NotesProps;
}

export const NotesContext = createContext<NotesContextProps | null>(null);

export const NotesContextProvider = ({ children }: ProviderProps) => {
  const { Exit } = useContext(UserContext) as UserContextProps;
  const { handleError } = useContext(
    GlobalToolsContext
  ) as GlobalToolsContextProps;

  const [notes, setNotes] = useState([]);

  async function List() {
    const response = await notesApi.allNotes();

    switch (response.status) {
      case 200:
        if (response.data.length > 0) {
          setNotes(response.data);
        } else {
          setNotes([]);
        }
        break;

      case 401:
        Exit();
        break;

      default:
        handleError("Something wrong, try again");
        break;
    }
  }

  return (
    <NotesContext.Provider
      value={{
        List,
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
