/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Leaderboard from "../../src/components/Leaderboard/Leaderboard";

describe("Leaderboard", () => {

  test("changes time period and updates the active class", async () => {
    const { getByText } = render(<Router><Leaderboard /></Router>);
    await waitFor(() => {
      const weekBtn = getByText("Week");
      const monthBtn = getByText("Month");
      const allTimeBtn = getByText("All-Time");

      fireEvent.click(monthBtn);
      expect(monthBtn).toHaveClass("active");
      expect(weekBtn).not.toHaveClass("active");
      expect(allTimeBtn).not.toHaveClass("active");

      fireEvent.click(allTimeBtn);
      expect(allTimeBtn).toHaveClass("active");
      expect(weekBtn).not.toHaveClass("active");
      expect(monthBtn).not.toHaveClass("active");
    });

  });

  test("paginates users", async () => {
    const { getByText } = render(<Router><Leaderboard /></Router>);

    await waitFor(() => {
      const prevBtn = getByText("Previous");
      expect(prevBtn).toBeDisabled();
    });

    const pageSpan = getByText("Page 1");
    const nextBtn = getByText("Next");
    const prevBtn = getByText("Previous");

    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(pageSpan).toHaveTextContent("Page 2");
      expect(prevBtn).not.toBeDisabled();
    });


    fireEvent.click(prevBtn);
    await waitFor(() => {
      expect(pageSpan).toHaveTextContent("Page 1");
    })

  });
});