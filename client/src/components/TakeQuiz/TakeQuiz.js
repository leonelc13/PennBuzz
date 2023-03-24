import React, { useState, useRef } from 'react';
import QuizResults from './QuizResults';
import './quizStyle.css'


function TakeQuiz({ title, questions, submitted, setSubmitted }) {
    // Initialize States
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // handle next button click
    const handleNextButtonClick = (e) => {
        if (selectedAnswerIndex || selectedAnswerIndex === 0) {
            selectedAnswers[currentQuestion] = selectedAnswerIndex;
            const nextQuestion = currentQuestion + 1;        
            setCurrentQuestion(nextQuestion);
            setSelectedAnswerIndex(selectedAnswers[nextQuestion]);
        } else {
            alert('Please select an answer');
        }
                
    }

    // handle previous button click
    const handlePreviousButtonClick = (e) => {
        selectedAnswers[currentQuestion] = selectedAnswerIndex;
        const nextQuestion = currentQuestion - 1;
        setCurrentQuestion(nextQuestion);
        setSelectedAnswerIndex(selectedAnswers[nextQuestion]);   
    }

    //handle submit button click
    const handleSubmitQuizButtonClick = (e) => {
        if (selectedAnswerIndex || selectedAnswerIndex === 0) {
            selectedAnswers[currentQuestion] = selectedAnswerIndex;
            const nextQuestion = currentQuestion + 1;  
            setSubmitted(true);
        } else {
            alert('Please select an answer');
        }        
    }

    // handles answer selection
    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index);
    }

    // conditional rendering of quiz results
    if (submitted) {
        return (
            <div>
                <QuizResults selectedAnswers={selectedAnswers} questions={questions} />
            </div>
        )
    } // conditional rendering of last question with submit button  
    else if(currentQuestion === questions.length - 1) {
        return (
            <div className='.take-quiz-body'>
                <div className='take-quiz-container'>
                    <h2>{title}</h2>
                    <div>
                        <h3> {questions[currentQuestion].question}</h3>
                        <ul>
                            {questions[currentQuestion].answers.map((answer, index) => (
                                <li
                                    onClick={() => onAnswerSelected(answer, index)}
                                    key={answer}
                                    style={{
                                        backgroundColor: selectedAnswerIndex === index ? '#FF2D46' : '',
                                        color: selectedAnswerIndex === index ? 'white' : '',
                                    }}>
                                    {answer}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className='in-quiz-button' onClick={handlePreviousButtonClick}>Previous</button>
                    <button className='in-quiz-button' onClick={handleSubmitQuizButtonClick}>Submit</button>                
                </div>
            </div>
            
        )
    } // conditional rendering of first question and next button
    else if (currentQuestion === 0) {
        return (
            <div className='take-quiz-container'>
                <h2>{title}</h2>
                <div>
                    <h3> {questions[currentQuestion].question}</h3>
                    <ul>
                        {questions[currentQuestion].answers.map((answer, index) => (
                            <li
                                onClick={() => onAnswerSelected(answer, index)}
                                key={answer}
                                style={{
                                    backgroundColor: selectedAnswerIndex === index ? '#FF2D46' : '',
                                    color: selectedAnswerIndex === index ? 'white' : '',
                                }}>
                                {answer}
                            </li>
                        ))}
                    </ul>
                </div>
                <button className='in-quiz-button' onClick={handleNextButtonClick}>Next</button>
            </div>
        );
    }
    // rendering of default question
    return (
        <div className='take-quiz-container'>
            <h2>{title}</h2>
            <div>
                <h3> {questions[currentQuestion].question}</h3>
                <ul>
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <li
                            onClick={() => onAnswerSelected(answer, index)}
                            key={answer}
                            style={{
                                backgroundColor: selectedAnswerIndex === index ? '#FF2D46' : '',
                                color: selectedAnswerIndex === index ? 'white' : '',
                            }}>
                            {answer}
                        </li>
                    ))}
                </ul>
            </div>
            <button className='in-quiz-button' onClick={handlePreviousButtonClick}>Previous</button>
            <button className='in-quiz-button' onClick={handleNextButtonClick}>Next</button>            
        </div>
    );
}

export default TakeQuiz;