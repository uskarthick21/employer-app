import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useDebounceResize from "../hooks/useDebounceResize";

// Mock window.innerWidth and event listeners
const resizeEventListeners: {
  [key: string]: EventListenerOrEventListenerObject;
} = {};

beforeEach(() => {
  vi.stubGlobal("window", {
    innerWidth: 800, // Default to mobile width
    addEventListener: vi.fn((event, callback) => {
      resizeEventListeners[event] = callback;
    }),
    removeEventListener: vi.fn((event) => {
      delete resizeEventListeners[event];
    }),
  });

  vi.useFakeTimers(); // Simulate debounce delay
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("useDebounceResize Hook", () => {
  it("returns true when screen width is less than 1024px (Mobile)", () => {
    const { result } = renderHook(() => useDebounceResize());
    expect(result.current).toBe(true);
  });

  it("returns false when screen width is greater than or equal to 1024px (Desktop)", () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useDebounceResize());
    expect(result.current).toBe(false);
  });

  it("updates isMobile state when window is resized", () => {
    const { result } = renderHook(() => useDebounceResize());

    // Simulate desktop screen
    window.innerWidth = 1300;
    act(() => {
      resizeEventListeners.resize(new Event("resize"));
      vi.advanceTimersByTime(300); // Move time forward to trigger debounce
    });

    expect(result.current).toBe(false);

    // Simulate mobile screen
    window.innerWidth = 800;
    act(() => {
      resizeEventListeners.resize(new Event("resize"));
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe(true);
  });

  it("debounces the resize event properly", () => {
    const { result } = renderHook(() => useDebounceResize());

    window.innerWidth = 1300;
    act(() => {
      resizeEventListeners.resize(new Event("resize"));
      vi.advanceTimersByTime(150); // Only half the debounce time
    });

    expect(result.current).toBe(true); // State should NOT have updated yet

    act(() => {
      vi.advanceTimersByTime(150); // Complete debounce delay
    });

    expect(result.current).toBe(false); // State should update now
  });

  it("cleans up event listeners on unmount", () => {
    const { unmount } = renderHook(() => useDebounceResize());

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
