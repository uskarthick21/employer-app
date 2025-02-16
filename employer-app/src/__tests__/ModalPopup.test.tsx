import { render, screen, fireEvent } from "@testing-library/react";
import ModalPopup from "../components/ModalPopup";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

vi.mock("react-dom", async () => {
  const actual = await vi.importActual<typeof import("react-dom")>("react-dom");
  return {
    ...actual,
    createPortal: (node: any) => node,
  };
});

beforeEach(() => {
  document.body.innerHTML = '<div id="modal-root"></div>';
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("ModalPopup", () => {
  it("renders the modal with provided children", () => {
    render(
      <ModalPopup onClose={() => {}}>
        <p>Test Modal Content</p>
      </ModalPopup>
    );

    expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
  });

  it("closes the modal when clicking the close button", () => {
    const onCloseMock = vi.fn();
    render(
      <ModalPopup onClose={onCloseMock}>
        <p>Test Modal</p>
      </ModalPopup>
    );

    console.log(document.body.innerHTML);

    let closeButton = screen.queryByRole("button", { name: "Close modal" });

    if (!closeButton) {
      closeButton = document.querySelector(".close-button");
    }

    expect(closeButton).not.toBeNull();
    fireEvent.click(closeButton as HTMLElement);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not close the modal when clicking inside the modal content", () => {
    const onCloseMock = vi.fn();
    render(
      <ModalPopup onClose={onCloseMock}>
        <p>Test Modal</p>
      </ModalPopup>
    );

    fireEvent.click(screen.getByText("Test Modal"));
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
