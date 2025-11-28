import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./app/AppRouter";
import { AuthProvider } from "./modules/auth/contexts/AuthProvider";
import { ErrorBoundary } from "./components/Layout/ErrorBoundary";
const router = createBrowserRouter([...appRoutes]);
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
