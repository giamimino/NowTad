import { createContext } from "react";
import { User } from "../global";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export const SessionContext = createContext<UserContextType | null>({
  user: null,
  setUser: () => {}
})