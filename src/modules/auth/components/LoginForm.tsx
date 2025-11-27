import React, { useEffect, useState } from "react";
import type { FormState } from "../types/auth.type";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Lock, LucideEye, LucideEyeOff, Mail } from "lucide-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { signinUser } from "../../../services/auth.service";

const initialFormState: FormState = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShowEyeIcon, setPasswordShowEyeIcon] = useState(false);

  const formik = useFormik<FormState>({
    initialValues: initialFormState,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await signinUser(values.email, values.password);

        const { user, session, error } = response;
        console.log({ response, user, session, error });
        if (user) {
          setIsLoading(false);
          setIsAuthenticated(true);
          setAccessToken(session?.access_token || "");
          toast.success("Login successful");
          localStorage.setItem("isAuthenticated", true.toString());
          localStorage.setItem("accessToken", session?.access_token || "");
          localStorage.setItem("refreshToken", session?.refresh_token || "");
          localStorage.setItem("session", JSON.stringify(session));
        } else if (error) {
          toast.error(error.message || "Login failed");
        }
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error.message || "Login failed");
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center m-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-2 w-full justify-center items-center"
      >
        <div className="w-full">
          <label
            htmlFor="email"
            className="hidden lg:block text-xs 2xl:text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative pb-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-600 rounded-lg focus:outline-none focus:ring-0 focusborder-0 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-xs lg:text-sm text-red-500 mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="hidden lg:block text-sm 2xl:text-base font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative pb-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
              <input
                type={passwordShowEyeIcon ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-600 rounded-lg focus:outline-none focus:ring-0 focusborder-0 transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-5 w-5 h-5 text-gray-400"
                onClick={(e) => {
                  setPasswordShowEyeIcon((prev) => !prev);
                  e.preventDefault();
                }}
              >
                {passwordShowEyeIcon ? <LucideEyeOff /> : <LucideEye />}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <div className="text-xs 2xl:text-sm text-red-500 mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-400 text-white py-2 mt-2 mb-2 lg:mt-4 2xl:py-2.5 text-xs 2xl:text-base px-4 rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
