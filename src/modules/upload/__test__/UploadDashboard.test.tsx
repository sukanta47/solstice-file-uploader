import { render, screen } from "@testing-library/react";
import UploadDashboard from "../pages/UploadDashboard";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../../../utils/test-utils";
import MyFilesGrid from "../components/MyFilesGrid";

describe("Upload Dashboard component", () => {
  it("renders the File Uploads text", () => {
    renderWithProviders(<UploadDashboard />);
    expect(screen.getByText("File Uploads")).toBeInTheDocument();
  });
  it("renders My file grid", () => {
    render(<MyFilesGrid />);
    const ele = screen.getByText("Loading files...");
    expect(ele).toBeInTheDocument();
  });
});
