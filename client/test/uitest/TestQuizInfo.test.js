import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuizInfo from './QuizInfo';

describe('QuizInfo component', () => {
  const props = {
    title: 'Test Quiz',
    description: 'A quiz for testing purposes',
    author_name: 'Test Author',
    author_img: 'test.jpg',
    thumbnail_img: 'test.jpg',
    upvotes: 5,
    downvotes: 2,
    labels: ['Test Label'],
  };

  it('renders the quiz information correctly', () => {
    const { getByText, getByAltText } = render(<QuizInfo props={props} />);
    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.description)).toBeInTheDocument();
    expect(getByAltText('quiz-thumbnail')).toBeInTheDocument();
    expect(getByAltText('author profile picture')).toBeInTheDocument();
    expect(getByText(props.author_name)).toBeInTheDocument();
    expect(getByText(props.labels[0])).toBeInTheDocument();
    expect(getByText(props.upvotes)).toBeInTheDocument();
    expect(getByText(props.downvotes)).toBeInTheDocument();
  });

  it('renders the comment list correctly', () => {
    const comments = [
      { author: 'Test User 1', commentContent: 'Test comment 1' },
      { author: 'Test User 2', commentContent: 'Test comment 2' },
    ];
    const { getByText } = render(<QuizInfo props={props} />);
    comments.forEach((comment) => {
      expect(getByText(comment.author)).toBeInTheDocument();
      expect(getByText(comment.commentContent)).toBeInTheDocument();
    });
  });

  it('toggles the quiz on and off', () => {
    const { getByText } = render(<QuizInfo props={props} />);
    fireEvent.click(getByText('Take Quiz'));
    expect(getByText('Back to Quiz Info')).toBeInTheDocument();
    fireEvent.click(getByText('Back to Quiz Info'));
    expect(getByText('Take Quiz')).toBeInTheDocument();
  });

});
