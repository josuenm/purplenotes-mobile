import { createContext, useContext, useState } from "react";
import notesApi from "../services/notesApi";
import { NoteProps } from "../types/NoteProps";
import { GlobalToolsContext } from "./globalToolsContext";
import { UserContext } from "./userContext";

interface ProviderProps {
  children: React.ReactNode;
}

interface NotesContextProps {
  List: () => Promise<void>;
  Create: () => Promise<void>;
  Delete: (id: string) => Promise<void>;
  FindById: (id: string) => NoteProps | undefined;
  Update: (id: string, data: string) => Promise<void>;
  notes: NoteProps[];
}

export const NotesContext = createContext({} as NotesContextProps);

export const NotesContextProvider = ({ children }: ProviderProps) => {
  const { Exit } = useContext(UserContext);
  const { handleError, handleSuccessful } = useContext(GlobalToolsContext);

  const [notes, setNotes] = useState<NoteProps[] | []>([]);

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

  function FindById(id: string) {
    return notes.find((note) => note._id === id);
  }

  async function Create() {
    const response = await notesApi.create();

    switch (response.status) {
      case 201:
        setNotes((prev) => [...prev, response.data]);
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
        setNotes((prev) => notes.filter((note) => note._id !== id));
        break;

      case 401:
        Exit();
        break;

      default:
        handleError("Something wrong, try again");
        break;
    }
  }

  async function Update(id: string, data: string) {
    const response = await notesApi.update(id, data);

    switch (response.status) {
      case 200:
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
        FindById,
        Update,
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
