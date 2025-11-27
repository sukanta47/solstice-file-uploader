export type FormState = {
  email: string;
  password: string;
};
export type AuthResponse = {
  token: string;
  userId: string;
};
export type AuthValue = {
    accessToken: string;
    setAccessToken: (token: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
};