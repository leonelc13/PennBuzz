import React, { useState, useRef } from 'react';
import QuizResults from './QuizResults';
import './takeQuizStyle.css' 


function TakeQuiz({ title, questions, submitted, setSubmitted }) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

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
    const handlePreviousButtonClick = (e) => {
        selectedAnswers[currentQuestion] = selectedAnswerIndex;
        const nextQuestion = currentQuestion - 1;
        setCurrentQuestion(nextQuestion);
        setSelectedAnswerIndex(selectedAnswers[nextQuestion]);   
    }

    const handleSubmitQuizButtonClick = (e) => {
        if (selectedAnswerIndex || selectedAnswerIndex === 0) {
            selectedAnswers[currentQuestion] = selectedAnswerIndex;
            const nextQuestion = currentQuestion + 1;  
            setSubmitted(true);
        } else {
            alert('Please select an answer');
        }        
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index);
    }

    if (submitted) {
        return (
            <div>
                <QuizResults selectedAnswers={selectedAnswers} questions={questions} />
            </div>
        )
    } else if(currentQuestion === questions.length - 1) {
        return (
            <div className='.take-quiz-body'>
                <div className='take-quiz-container'>
                    <h2>{title}</h2>
                    <div>
                        <h3> {questions[currentQuestion][0]}</h3>
                        <ul>
                            {questions[currentQuestion][1].map((answer, index) => (
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
    } else if (currentQuestion === 0) {
        return (
            <div className='take-quiz-container'>
                <h2>{title}</h2>
                <div>
                    <h3> {questions[currentQuestion][0]}</h3>
                    <ul>
                        {questions[currentQuestion][1].map((answer, index) => (
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
    return (
        <div className='take-quiz-container'>
            <h2>{title}</h2>
            <div>
                <h3> {questions[currentQuestion][0]}</h3>
                <ul>
                    {questions[currentQuestion][1].map((answer, index) => (
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