import { describe, expect, it, vi } from "vitest";
import LoginPage from "../pages/LoginPage";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/test-utils";
import LoginForm from "../components/LoginForm";

const mockSetIsAuthenticated = vi.fn();
const mockSetAccessToken = vi.fn();

vi.mock("../hooks/useAuth", () => ({
  default: () => ({
    isAuthenticated: false,
    setIsAuthenticated: mockSetIsAuthenticated,
    setAccessToken: mockSetAccessToken,
  }),
}));

vi.mock("../../../services/auth.service", () => ({
  signinUser: vi.fn(() =>
    Promise.resolve({
      user: { id: "123" },
      session: {
        access_token: "fake_token",
        refresh_token: "fake_refresh",
      },
      error: null,
    })
  ),
}));

describe("Auth module test", () => {
  it("tests login page redering", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText("File Uploader")).toBeInTheDocument();
    expect(screen.getByText("File Uploader")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(
      screen.getByText("By continuing, you agree to our")
    ).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });
  it("tests the Login form", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
  it("tests login functionality", async () => {
    const event = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const email = screen.getByPlaceholderText(/enter your email/i);
    const password = screen.getByPlaceholderText(/enter your password/i);
    const loginBtn = screen.getByRole("button", { name: /sign in/i });

    await event.type(email, "solstice@example.com");
    await event.type(password, "Password@123");

    await event.click(loginBtn);

    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockSetAccessToken).toHaveBeenCalled();
  });
});
