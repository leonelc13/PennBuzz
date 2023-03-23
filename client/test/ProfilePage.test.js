/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProfilePage from "../src/components/ProfilePage/ProfilePage";
import Quiz from "../src/components/ProfilePage/Quiz";
import ButtonGroup from "../src/components/ProfilePage/ButtonGroup";

describe("ProfilePage", () => {
    test("displays the profile image and name", async () => {
      const profile = {
        profile_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
        user: "johndoe",
        biography: "I am a software developer.",
      };
      const quizzes = [];
  
      render(<ProfilePage user="johndoe" profile={profile} quizzes={quizzes} />);
  
      const profileImage = await screen.findByAltText("profile pic");
      expect(profileImage).toBeInTheDocument();
  
      const profileName = await screen.findByText("johndoe");
      expect(profileName).toBeInTheDocument();
    });
  });

  
describe("Quiz", () => {
  test("displays the author name, thumbnail image, and title", async () => {
    const quiz = {
      author_img: "https://example.com/author.jpg",
      author_name: "John Doe",
      thumbnail_img: "https://example.com/quiz.jpg",
      title: "Test Quiz",
      favorite: false,
    };

    render(<Quiz {...quiz} />);

    const authorName = await screen.findByText(quiz.author_name);
    expect(authorName).toBeInTheDocument();

    const thumbnailImg = await screen.findByAltText("quiz-image");
    expect(thumbnailImg.src).toBe(quiz.thumbnail_img);

    const title = await screen.findByText(quiz.title);
    expect(title).toBeInTheDocument();
  });
});

describe("ButtonGroup", () => {
  test("updates the selected button on click", async () => {
    render(<ButtonGroup />);

    const createdButton = screen.getByText("Created");
    const recentButton = screen.getByText("Recent");
    const favoritesButton = screen.getByText("Favorites");

    fireEvent.click(createdButton);
    expect(createdButton).toHaveClass("selected");
    expect(recentButton).not.toHaveClass("selected");
    expect(favoritesButton).not.toHaveClass("selected");

    fireEvent.click(recentButton);
    expect(recentButton).toHaveClass("selected");
    expect(createdButton).not.toHaveClass("selected");
    expect(favoritesButton).not.toHaveClass("selected");

    fireEvent.click(favoritesButton);
    expect(favoritesButton).toHaveClass("selected");
    expect(createdButton).not.toHaveClass("selected");
    expect(recentButton).not.toHaveClass("selected");
  });
});