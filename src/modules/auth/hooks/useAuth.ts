import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    throw new Error("No AuthContext found. Please ensure that you are using useAuth within an AuthProvider.");
  }
  return authContext;
}

export default useAuth;
