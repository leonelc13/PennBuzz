import React, { useState, useRef } from 'react';

function QuizResults ({selectedAnswers, questions, setSubmitted, setInQuiz}) {

    const handleBackButtonClick = (e) => {
        setInQuiz(false);
        setSubmitted(false);
    }

    return (
        <div>
            <h2>Your results!</h2>
            <ul>
                { selectedAnswers.map((answer, index) => (
                    <li> Question {index + 1} answer: {questions[index][1][answer]}</li>
                ))}
            </ul>
        </div>        
    )

}

export default QuizResults;