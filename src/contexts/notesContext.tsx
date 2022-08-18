import { createContext, useState } from "react";
import notesApi from "../services/notesApi";

interface ProviderProps {
  children: React.ReactNode;
}

export interface NotesContextProps {
  List: () => void;
}

export const NotesContext = createContext<NotesContextProps | null>(null);

export const NotesContextProvider = ({ children }: ProviderProps) => {
  const [notes, setNotes] = useState([]);

  async function List() {
    const response = await notesApi.allNotes();
    // switch (response.status) {
    //   case 200:
    //     if (response.data.length > 0) {
    //       setNotes(response.data);
    //     } else {
    //       setNotes([]);
    //     }
    //     break;
    //   case 401:
    //     break;
    //   default:
    //     break;
    // }
  }

  return (
    <NotesContext.Provider
      value={{
        List,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
