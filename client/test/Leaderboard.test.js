import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Leaderboard from "../src/components/Leaderboard/Leaderboard";

describe("Leaderboard", () => {

  test("changes time period and updates the active class", () => {
    render(<Leaderboard />);
    const weekBtn = screen.getByText("Week");
    const monthBtn = screen.getByText("Month");
    const allTimeBtn = screen.getByText("All-Time");

    fireEvent.click(monthBtn);
    expect(monthBtn).toHaveClass("active");
    expect(weekBtn).not.toHaveClass("active");
    expect(allTimeBtn).not.toHaveClass("active");

    fireEvent.click(allTimeBtn);
    expect(allTimeBtn).toHaveClass("active");
    expect(weekBtn).not.toHaveClass("active");
    expect(monthBtn).not.toHaveClass("active");
  });

  test("paginates users", () => {
    render(<Leaderboard />);
    const prevBtn = screen.getByText("Previous");
    const nextBtn = screen.getByText("Next");
    const pageSpan = screen.getByText("Page 1");

    expect(prevBtn).toBeDisabled();

    fireEvent.click(nextBtn);
    expect(pageSpan).toHaveTextContent("Page 2");
    expect(prevBtn).not.toBeDisabled();

    fireEvent.click(prevBtn);
    expect(pageSpan).toHaveTextContent("Page 1");
    expect(prevBtn).toBeDisabled();
  });
});