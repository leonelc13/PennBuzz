import React, { useState, useRef } from 'react';

function QuizResults ({selectedAnswers, questions}) {

    return (
        <div>
            <h2>Your results!</h2>
            <ul>
                { selectedAnswers.map((answer, index) => (
                    <li> Question {index + 1} answer: {questions[index].answers[answer]}</li>
                ))}
            </ul>
        </div>        
    )

}

export default QuizResults;