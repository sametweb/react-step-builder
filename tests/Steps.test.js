import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

test("Rendered components: Steps, Step", () => {
  render(<App />);

  // Get the "Next" button
  let next_button = screen.getByText(/next/i);

  // Make sure it's visible
  expect(next_button).toBeVisible();

  // Click "Next" button
  fireEvent.click(next_button);

  // Get "Previous" button
  let prev_button = screen.getByText(/previous/i);

  // Expect it to be visible
  expect(prev_button).toBeVisible();

  // Click "Previous" button
  fireEvent.click(prev_button);

  // A function that tries to find a "Previous" button
  let click = () => screen.getByText(/previous/i);

  // Expect an error finding previous button
  // Because it is back to first step
  expect(click).toThrow();
});
