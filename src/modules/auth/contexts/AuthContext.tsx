import { createContext } from "react";
import type { AuthValue } from "../types/auth.type";

export const AuthContext = createContext<AuthValue | undefined>(undefined);
