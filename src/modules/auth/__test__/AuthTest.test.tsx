import { describe, expect, it } from "vitest";
import LoginPage from "../pages/LoginPage";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import LoginForm from "../components/LoginForm";

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
  });
});
