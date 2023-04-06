/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import QuizInfo from '../../src/components/QuizInfo/QuizInfo';

jest.mock("axios");

describe("QuizInfo component", () => {
  const quizData = {
    title: "Which Penn Professor are you?",
    author_name: "johnwick",
    author_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    description: "Complete this quiz and find out your soulmate professor at Penn!",
    upvotes: 87,
    downvotes: 12,
    num_comments: 7,
    labels: ["Penn", "Professors"],
    timestamp: "12/12/2023",
    thumbnail_img: "https://drive.google.com/uc?id=1Guf_k6yMjbbhvPU8A77tNhj9-plnW726",
    quizId: '123',
    questions: [
      {
        question: 'Question 1 content',
        answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
      },
      {
        question: 'Question 2 content',
        answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
      },
      {
        question: 'Question 3 content',
        answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
      },
      {
        question: 'Question 4 content',
        answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
      }
    ],
    comments: [
      { author: 'AdamSmith', content: 'So fun!' },
      { author: 'johnwick', content: 'enjoy!' },
      { author: 'carguy', content: 'I disagree with my results' }
    ]
  }

  beforeEach(() => {
    axios.mockReset();
  });


  test("should render quiz info page with data after successful data retrieval", async () => {
    const quizData = {
      title: "Which Penn Professor are you?",
      author_name: "johnwick",
      author_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
      description: "Complete this quiz and find out your soulmate professor at Penn!",
      upvotes: 87,
      downvotes: 12,
      num_comments: 7,
      labels: ["Penn", "Professors"],
      timestamp: "12/12/2023",
      thumbnail_img: "https://drive.google.com/uc?id=1Guf_k6yMjbbhvPU8A77tNhj9-plnW726",
      quizId: '123',
      questions: [
        {
          question: 'Question 1 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        },
        {
          question: 'Question 2 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        },
        {
          question: 'Question 3 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        },
        {
          question: 'Question 4 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        }
      ],
      comments: [
        { author: 'AdamSmith', content: 'So fun!' },
        { author: 'johnwick', content: 'enjoy!' },
        { author: 'carguy', content: 'I disagree with my results' }
      ]
    }
    axios.get.mockResolvedValueOnce({ data: quizData });
    render(<QuizInfo user="testuser" />);
    await waitFor(() => expect(screen.getByText("Test Quiz")).toBeInTheDocument());
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Test Label 1")).toBeInTheDocument();
    expect(screen.getByText("Test Label 2")).toBeInTheDocument();
    expect(screen.getByText("This is a test quiz.")).toBeInTheDocument();
    expect(screen.getByText("Take Quiz")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("should render take quiz component when take quiz button is clicked", async () => {
    const quizData = {
      title: "Which Penn Professor are you?",
      author_name: "johnwick",
      author_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
      description: "Complete this quiz and find out your soulmate professor at Penn!",
      upvotes: 87,
      downvotes: 12,
      num_comments: 7,
      labels: ["Penn", "Professors"],
      timestamp: "12/12/2023",
      thumbnail_img: "https://drive.google.com/uc?id=1Guf_k6yMjbbhvPU8A77tNhj9-plnW726",
      quizId: '123',
      questions: [
        {
          question: 'Question 1 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        },
        {
          question: 'Question 2 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        },
        {
          question: 'Question 3 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        },
        {
          question: 'Question 4 content',
          answers: ['Answer 1 content', 'Answer 2 content', 'Answer 3 content', 'Answer 4 content']
        }
      ],
      comments: [
        { author: 'AdamSmith', content: 'So fun!' },
        { author: 'johnwick', content: 'enjoy!' },
        { author: 'carguy', content: 'I disagree with my results' }
      ]
    }
    axios.get.mockResolvedValueOnce({ data: quizData });
    render(<QuizInfo user="testuser" />);
    await waitFor(() => expect(screen.getByText("Test Quiz")).toBeInTheDocument());
    fireEvent.click(screen.getByText("Take Quiz"));
    expect(screen.getByText("Question 1")).toBeInTheDocument(); // Replace with actual question text
    expect(screen.getByText("Question 2")).toBeInTheDocument(); // Replace with actual question text
    expect(screen.getByText("Back to Quiz Info")).toBeInTheDocument();
  });

  test("should add a comment when add comment button is clicked", async () => {
    axios.get.mockResolvedValueOnce({ data: quizData });
    render(<QuizInfo user="testuser" />);
    await waitFor(() => expect(screen.getByText("Test User 1")).toBeInTheDocument());
    axios.post.mockResolvedValueOnce({ data: { author: "testuser", content: "This is a new comment" } });
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "This is a new comment" } });
    fireEvent.click(screen.getByText("Add Comment"));

  });

});
