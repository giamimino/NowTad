import { createContext } from "react";
import { User } from "../global";

export const SessionContext = createContext<User | null>(null)