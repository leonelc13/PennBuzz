/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizInfo from '../../src/components/QuizInfo/QuizInfo';

let props = {
  title: 'Test Quiz',
  description: 'This is a test quiz',
  author_name: 'John Doe',
  author_img: 'https://example.com/profile.jpg',
  thumbnail_img: 'https://example.com/thumbnail.jpg',
  upvotes: 10,
  downvotes: 2,
  labels: ['label1', 'label2'],
};


  test('shows quiz when "Take Quiz" button is clicked', () => {
    render(<QuizInfo props={props} />);

    const takeQuizButton = screen.getByText(/Take Quiz/i);
    fireEvent.click(takeQuizButton);

    const question1Element = screen.getByText(/question1/i);
    expect(question1Element).toBeInTheDocument();

    const answer1Element = screen.getByText(/answer1/i);
    expect(answer1Element).toBeInTheDocument();

    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeInTheDocument();
  });

describe('QuizInfo', () => {
  test('renders quiz information', () => {
    render(<QuizInfo props={props} />);
    const titleElement = screen.getByText(props.title);
    expect(titleElement).toBeInTheDocument();
    const authorNameElement = screen.getByText(props.author_name);
    expect(authorNameElement).toBeInTheDocument();
    const descriptionElement = screen.getByText(props.description);
    expect(descriptionElement).toBeInTheDocument();
    const thumbnailElement = screen.getByAltText('quiz-thumbnail');
    expect(thumbnailElement).toBeInTheDocument();
    const upvotesElement = screen.getByText(props.upvotes);
    expect(upvotesElement).toBeInTheDocument();
    const downvotesElement = screen.getByText(props.downvotes);
    expect(downvotesElement).toBeInTheDocument();
  });

  test('takes quiz when "Take Quiz" button is clicked', () => {
    render(<QuizInfo props={props} />);
    const takeQuizButton = screen.getByText('Take Quiz');
    fireEvent.click(takeQuizButton);
    const backToQuizInfoButton = screen.getByText('Back to Quiz Info');
    expect(backToQuizInfoButton).toBeInTheDocument();
  });


  test('upvotes and downvotes work correctly', () => {
    render(<QuizInfo props={props} />);
    const upvoteButton = screen.getAllByRole('button')[1];
    console.log(upvoteButton);
    const downvoteButton = screen.getAllByRole('button')[2];
    fireEvent.click(upvoteButton);
    expect(screen.getByText('11')).toBeInTheDocument();
    fireEvent.click(downvoteButton);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test("clicking the back to quiz info button displays the quiz info", () => {
    const props = {
      author_img: "test.png",
      author_name: "Test Author",
      description: "Test Description",
      labels: ["label1", "label2"],
      thumbnail_img: "test-thumbnail.png",
      title: "Test Quiz",
      upvotes: 10,
      downvotes: 5,
    };
    render(<QuizInfo props={props} />);
    
    // Click on the "Take Quiz" button
    const takeQuizButton = screen.getByText("Take Quiz");
    fireEvent.click(takeQuizButton);
  
    // Click on the "Back to Quiz Info" button
    const backButton = screen.getByText("Back to Quiz Info");
    fireEvent.click(backButton);
  
    // Ensure that the quiz info is displayed again
    const quizTitle = screen.getByText(props.title);
    const quizDescription = screen.getByText(props.description);
    expect(quizTitle).toBeInTheDocument();
    expect(quizDescription).toBeInTheDocument();
  });
  

});
