import { createContext } from "react";
import { NoteContext } from "../global";

interface NotesContextType {
  content: NoteContext[];
  setContent: React.Dispatch<React.SetStateAction<NoteContext[]>>;
}

export const NotesContext = createContext<NotesContextType | null>(null)