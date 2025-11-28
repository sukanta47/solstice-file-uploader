import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AppLayout;
