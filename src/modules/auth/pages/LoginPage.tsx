import { ToastContainer } from "react-toastify";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <h4 className="text-xl font-semibold text-violet-400 absolute top-5 left-5 mb-4">
        File Uploader
      </h4>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light text-slate-900 mb-3">Login</h1>
        </div>
        <div className="bg-violet-100 rounded-2xl p-8 border border-slate-200">
          <LoginForm />
        </div>
        <p className="text-center text-slate-500 text-sm mt-6">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-violet-600 hover:text-violet-700 underline"
          >
            Terms of Service
          </a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginPage;
