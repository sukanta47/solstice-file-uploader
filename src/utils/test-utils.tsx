import { render } from "@testing-library/react";
import { AuthProvider } from "../modules/auth/contexts/AuthProvider";
import { MemoryRouter } from "react-router-dom";

export function renderWithProviders(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
}
