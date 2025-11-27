import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthValue } from "../types/auth.type";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [accessToken, setAccessToken] = useState<string>(() => {
    const sessionObj = localStorage.getItem("session");
    return sessionObj ? JSON.parse(sessionObj).access_token : "";
  });

  const authValue: AuthValue = {
    isAuthenticated,
    setIsAuthenticated,
    accessToken,
    setAccessToken,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
