/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CreateTest from '../src/components/CreateQuiz/CreateTest';
import CreateTestQuestion from '../src/components/CreateQuiz/CreateTestQuestion';
import CreateQuiz from '../src/components/CreateQuiz/CreateQuiz';

describe('CreateQuiz', () => {
  const mockUser = {};
  test('renders CreateQuiz component', () => {
    render(<CreateQuiz />);
    const createQuizHeading = screen.getByText(/choose quiz type/i);
    expect(createQuizHeading).toBeInTheDocument();
  });
});

describe('CreateTestQuestion', () => {
  const mockOnTableDataChange = jest.fn();
  const mockOnImagePreviewChange = jest.fn();

  test('renders question number', async () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const questionNumberElement = await screen.findByText(/Question 1/i, {exact: false});
    expect(questionNumberElement).toBeInTheDocument();
  });

  test('updates question textarea', () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const questionTextarea = screen.getByLabelText('Question:');
    userEvent.type(questionTextarea, 'What is the capital of France?');
    expect(questionTextarea.value).toBe('What is the capital of France?');
  });

  test('updates option input', () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const optionInput = screen.getByRole('textbox', { name: '' });
    userEvent.type(optionInput, 'Paris');
    expect(optionInput.value).toBe('Paris');
  });

  test('updates correct checkbox', () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const correctCheckbox = screen.getByRole('checkbox');
    fireEvent.click(correctCheckbox);
    expect(correctCheckbox.checked).toBe(true);
  });

  test('adds and removes option row', () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const addOptionButton = screen.getByText('Add Option');
    fireEvent.click(addOptionButton);

    // Check if the second row was added
    const optionInputs = screen.getAllByRole('textbox', { name: '' });
    expect(optionInputs.length).toBe(2);

    // Remove the second row
    const removeOptionButton = screen.getByText('Remove Option');
    fireEvent.click(removeOptionButton);

    // Check if the second row was removed
    const updatedOptionInputs = screen.getAllByRole('textbox', { name: '' });
    expect(updatedOptionInputs.length).toBe(1);
  });

  test('uploads image', () => {
    const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const input = screen.getByLabelText(/upload image/i);
    userEvent.upload(input, file);
    expect(input.files[0]).toStrictEqual(file);
    expect(input.files.item(0)).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
  });
  
  test('calls onTableDataChange when option input is updated', () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const optionInput = screen.getByRole('textbox', { name: '' });
    userEvent.type(optionInput, 'Paris');
    expect(mockOnTableDataChange).toHaveBeenCalled();
  });
  
  test('calls onTableDataChange when correct checkbox is toggled', () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const correctCheckbox = screen.getByRole('checkbox');
    fireEvent.click(correctCheckbox);
    expect(mockOnTableDataChange).toHaveBeenCalled();
  });
  
  test('renders table header', () => {
    render(<CreateTestQuestion questionNumber={1} onTableDataChange={mockOnTableDataChange} onImagePreviewChange={mockOnImagePreviewChange} />);
    const table = screen.getByRole('table');
    const headerOption = within(table).getByText('Option');
    const headerCorrect = within(table).getByText('Correct');
    expect(headerOption).toBeInTheDocument();
    expect(headerCorrect).toBeInTheDocument();
  });
});

describe('CreateTest', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
  };

  test('renders quiz name input', () => {
    render(<CreateTest user={mockUser} />);
    const quizNameInput = screen.getByText(/name your quiz/i);
    expect(quizNameInput).toBeInTheDocument();
  });

  test('renders quiz thumbnail upload', () => {
    render(<CreateTest user={mockUser} />);
    const thumbnailUploadInput = screen.getByLabelText(/upload thumbnail/i);
    expect(thumbnailUploadInput).toBeInTheDocument();
  });

  test('adds and removes question', () => {
    render(<CreateTest user={mockUser} />);
    const addQuestionButton = screen.getByText(/add question/i);
    fireEvent.click(addQuestionButton);

    // Check if the second question was added
    const question2 = screen.getByText('Question 2');
    expect(question2).toBeInTheDocument();

    // Remove the second question
    const removeQuestionButton = screen.getByText(/remove question/i);
    fireEvent.click(removeQuestionButton);

    // Check if the second question was removed
    expect(screen.queryByText('Question 2')).toBeNull();
  });

  test('renders submit quiz button', () => {
    render(<CreateTest user={mockUser} />);
    const submitQuizButton = screen.getByText(/submit quiz/i);
    expect(submitQuizButton).toBeInTheDocument();
  });

  test('updates quiz name input', () => {
    render(<CreateTest user={mockUser} />);
    const quizNameInput = document.getElementById('quiz_title');
    userEvent.type(quizNameInput, 'Geography Quiz');
    expect(quizNameInput.value).toBe('Geography Quiz');
  });

  test('handles thumbnail upload', async () => {
    const file = new File(['(⌐□_□)'], 'thumbnail.png', { type: 'image/png' });

    render(<CreateTest user={mockUser} />);
    const thumbnailUploadInput = screen.getByLabelText(/upload thumbnail/i);

    userEvent.upload(thumbnailUploadInput, file);
    expect(thumbnailUploadInput.files[0]).toEqual(file);
    expect(thumbnailUploadInput.files.item(0)).toEqual(file);
    expect(thumbnailUploadInput.files).toHaveLength(1);
  });
});