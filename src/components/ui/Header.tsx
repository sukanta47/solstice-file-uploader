import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../modules/auth/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const logoutHandler = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-center bg-purple-200 w-full p-4">
      <h1 className="text-2xl font-bold text-purple-800">File Uploader</h1>
      <button
        className="absolute top-4 right-4 bg-white text-purple-600 px-4 py-2 rounded-lg shadow-md hover:bg-purple-50"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
