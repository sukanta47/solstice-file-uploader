import { describe, expect, it } from "vitest";
import LoginPage from "../pages/LoginPage";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Auth module test", () => {
  it("tests login page redering", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText("File Uploader")).toBeInTheDocument();
    expect(screen.getByText("File Uploader")).toBeInTheDocument();
    expect(screen.getByRole("h1")).toHaveDisplayValue("Login");
    expect(
      screen.getByText("By continuing, you agree to our")
    ).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });
});
