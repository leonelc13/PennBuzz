/**
 * @jest-environment jsdom
 */
import React, {useState} from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TakeQuiz from '../../src/components/TakeQuiz/TakeQuiz';
import '@testing-library/jest-dom';
import QuizResults from '../../src/components/TakeQuiz/QuizResults';

describe('TakeQuiz component', () => {
    const title = 'Test Trivia';
    var submitted = false;
    const setSubmitted = (value) => {submitted = value};
    

    const questions = [
        {
            question:'What is the capital of France?', 
            answers: ['Paris', 'Madrid', 'London', 'Berlin'], 
            correct: 'Paris'
        },
        {
            question: 'Who invented the telephone?', 
            answers: ['Thomas Edison', 'Alexander Graham Bell', 'Benjamin Franklin', 'Nikola Tesla'],
            correct: 'Alexander Graham Bell'
        },
        {
            question: 'What is the largest planet in our solar system?',
            answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
            correct: 'Jupiter'
        }
    ];

    test('renders the first question and options correctly', () => {
        const { getByText } = render(<TakeQuiz title={title} questions={questions} submitted={submitted} setSubmitted={setSubmitted} />);
        expect(getByText(questions[0].question)).toBeInTheDocument();
        expect(getByText(questions[0].answers[0])).toBeInTheDocument();
        expect(getByText(questions[0].answers[1])).toBeInTheDocument();
        expect(getByText(questions[0].answers[2])).toBeInTheDocument();
        expect(getByText(questions[0].answers[3])).toBeInTheDocument();
    });

    test('renders the title correctly', () => {
        const { getByText } = render(<TakeQuiz title={title} questions={questions} submitted={submitted} setSubmitted={setSubmitted} />);
        expect(getByText(title)).toBeInTheDocument();
    });

    test('displays the next question and options when "Next" button is clicked', () => {
        const { getByText } = render(<TakeQuiz title={title} questions={questions} submitted={submitted} setSubmitted={setSubmitted} />);
        const nextButton = getByText('Next');
        const answerOne = getByText('Paris');
        fireEvent.click(answerOne)
        fireEvent.click(nextButton);
        expect(getByText(questions[1].question)).toBeInTheDocument();
        expect(getByText(questions[1].answers[0])).toBeInTheDocument();
        expect(getByText(questions[1].answers[1])).toBeInTheDocument();
        expect(getByText(questions[1].answers[2])).toBeInTheDocument();
        expect(getByText(questions[1].answers[3])).toBeInTheDocument();
    });

    test('displays the previous question and options when "Previous" button is clicked', () => {
        const { getByText } = render(<TakeQuiz title={title} questions={questions} submitted={submitted} setSubmitted={setSubmitted} />);
        const nextButton = getByText('Next');
        const answerOne = getByText('Paris');
        fireEvent.click(answerOne)
        fireEvent.click(nextButton);        
        const previousButton = getByText('Previous');
        fireEvent.click(previousButton);
        expect(getByText(questions[0].question)).toBeInTheDocument();
        expect(getByText(questions[0].answers[0])).toBeInTheDocument();
        expect(getByText(questions[0].answers[1])).toBeInTheDocument();
        expect(getByText(questions[0].answers[2])).toBeInTheDocument();
        expect(getByText(questions[0].answers[3])).toBeInTheDocument();
    });

    test('displays the "Submit" button on the last question', () => {
        const { getByText, queryByText } = render(<TakeQuiz title={title} questions={questions} submitted={submitted} setSubmitted={setSubmitted} />);
        const nextButton = getByText('Next');
        const answerOne = getByText('Paris');
        fireEvent.click(answerOne)
        fireEvent.click(nextButton);     
           
        const nextButtonTwo = getByText('Next');
        const answerTwo = getByText('Alexander Graham Bell');
        fireEvent.click(answerTwo)
        fireEvent.click(nextButtonTwo);

        expect(queryByText('Next')).toBeNull();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    test('displays the "Results" page', () => {
        const selectedAnswers = [0, 1, 2];
        const { getByText, queryByText } = render(<QuizResults selectedAnswers={selectedAnswers} questions={questions} setSubmitted={setSubmitted} setInQuiz={null}/>);
        
        expect(getByText('Your results!')).toBeInTheDocument();
        expect(getByText('Question 1 answer: Paris')).toBeInTheDocument();
        expect(getByText('Question 2 answer: Alexander Graham Bell')).toBeInTheDocument();
        expect(getByText('Question 3 answer: Jupiter')).toBeInTheDocument();
    });
});
