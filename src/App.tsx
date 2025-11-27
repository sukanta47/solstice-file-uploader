import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./app/AppRouter";
import { AuthProvider } from "./modules/auth/contexts/AuthProvider";
const router = createBrowserRouter([...appRoutes]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
