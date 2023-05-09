import React, { useState, useRef } from 'react';

function QuizResults ({selectedAnswers, questions}) {

    const score = 0;

    function ListItem(props) {
        const { index, questions, answer } = props;
        console.log(questions, answer, index);
        if(questions[index].options) {
            if (questions[index].options.answers[answer].correct) {
                score ++;
            }
            const color = questions[index].options[answer].correct ? "green" : "red";
            return (
                <li style={{ color }}>
                    Question {index + 1} answer: {questions[index].answers[answer]}
                </li>
            );
        }
        return (
            <li>
                Question {index + 1} answer: {questions[index].answers[answer]}
            </li>
        );
    }

    return (
        <div>
            <h2>Your results!</h2>
            <ul>
                { selectedAnswers.map((answer, index) => (
                    <ListItem index={index} questions={questions} answer={answer}/>
                ))}
            </ul>
            <ul>
                Your Score: {score}
            </ul>
        </div>        
    )

}

export default QuizResults;