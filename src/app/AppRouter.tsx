import { Navigate } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import LoginPage from "../modules/auth/pages/LoginPage";
import UploadDashboard from "../modules/upload/pages/UploadDashboard";
import ProtectedRoute from "./ProtectedRoute";

export const appRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <UploadDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];
