import { createContext, useContext, useState } from "react";
import notesApi from "../services/notesApi";
import { NotesProps } from "../types/NoteProps";
import {
  GlobalToolsContext,
  GlobalToolsContextProps,
} from "./globalToolsContext";
import { UserContext, UserContextProps } from "./userContext";

interface ProviderProps {
  children: React.ReactNode;
}

export interface NotesContextProps {
  List: () => void;
  Create: () => void;
  Delete: (id: string) => void;
  notes: NotesProps[];
}

export const NotesContext = createContext<NotesContextProps | null>(null);

export const NotesContextProvider = ({ children }: ProviderProps) => {
  const { Exit } = useContext(UserContext) as UserContextProps;
  const { handleError, handleSuccessful } = useContext(
    GlobalToolsContext
  ) as GlobalToolsContextProps;

  const [notes, setNotes] = useState<NotesProps[] | []>([]);

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

  async function Create() {
    const response = await notesApi.create();

    switch (response.status) {
      case 201:
        List();
        break;

      case 401:
        Exit();
        break;

      default:
        handleError("Something wrong, try again");
        break;
    }
  }

  async function Delete(id: string) {
    const response = await notesApi.delete(id);

    switch (response.status) {
      case 204:
        handleSuccessful("Successfully deleted");
        List();
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
        Create,
        Delete,
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
