/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import { BrowserRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import ProfilePage from "../../src/components/ProfilePage/ProfilePage";
import Quiz from "../../src/components/ProfilePage/Quiz";
import ButtonGroup from "../../src/components/ProfilePage/ButtonGroup";

import axios from 'axios';
jest.mock('axios');


const mock_profile_data = {
  "data": {
    "profile_img": "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    "name": "johndoe",
    "biography": "I am a software developer."
  }
};

const mock_quizzes = {
  "data": [{
    author_img: "https://example.com/author.jpg",
    author_name: "John Doe",
    thumbnail_img: "https://example.com/quiz.jpg",
    title: "Test Quiz",
    favorite: false,
  }]
};

const uriParams = { id: '123' };

describe("ProfilePage", () => {



  test("displays the profile image and name", async () => {
    const profileGetURL = 'http://localhost:3000/profile/johndoe';
    const quizzesGetURL = 'http://localhost:3000/quizzes';

    axios.get.mockImplementation((url) => {
      console.log(url);
      switch (url) {
        case profileGetURL:
          return Promise.resolve(mock_profile_data);
        case quizzesGetURL:
          return Promise.resolve(mock_quizzes);
        default:
          throw new Error(`Unexpected URL: ${url}`);
      }
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={['/profile/johndoe']}>
        <Routes>
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter >);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/profile/johndoe');

      // Find profile name
      const profileName = getByText("johndoe");
      expect(profileName).toBeInTheDocument();
    });
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