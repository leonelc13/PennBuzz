import React, { useState, useRef } from 'react';
import TakeQuiz from '../TakeQuiz/TakeQuiz';
import CommentList from '../Comments/CommentList';
import './quizStyle.css'

function QuizInfo({props}) {
    const [inQuiz, setInQuiz] = useState(false);    
    const [submitted, setSubmitted] = useState(false);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes);
    const answers = ['answer1', 'answer2', 'answer3', 'answer4'];
    const questions = [['question1', answers], ['question2', answers], ['question3', answers], ['question4', answers]];
    const comments = [
        {author: 'AdamSmith', commentContent: 'So fun!'},
        {author: 'johnwick', commentContent: 'enjoy!'},
        {author: 'carguy', commentContent: 'I disagree with my results'}
    ]

    function handleOnTakeQuizClick() {
        setInQuiz(!inQuiz);
    }

    const handleBackButtonClick = (e) => {
        setInQuiz(false);
        setSubmitted(false);
    }

    const handleUpvoteClick = (e) => {
        setUpvotes(upvotes + 1);
    }

    const handleDownvoteClick = (e) => {
        setDownvotes(downvotes + 1);
    }

    if (inQuiz === true) {
        return (
            <div>
                <TakeQuiz title={props.title} questions={questions} 
                        submitted={submitted} setSubmitted={setSubmitted}/>
                <button className='quiz-take-quiz-button' onClick={handleBackButtonClick}>Back to Quiz Info</button>
            </div>
        );
      }   


    return(
        <div className="quiz-container">
            <div className="quiz-header-container">
                <span className="quiz-author">
                    <span className="quiz-author-img-wrapper">
                        <img src={props.author_img} alt="author profile picture"></img>
                    </span>
                    {props.author_name}
                </span>
                <span className="quiz-labels-container">
                    {
                        props.labels.map(label => (
                            <div >{label}</div>
                        ))
                    }
                </span>
            </div>
            <div className="quiz-information">
                <div className="quiz-text">
                    <span className="quiz-title">{props.title}</span>
                    <span className="quiz-description">{props.description}</span>
                </div>
                <div className="quiz-buttons">
                    <button className="quiz-take-quiz-button" onClick={handleOnTakeQuizClick}>
                        Take Quiz
                    </button>
                    <div className="quiz-upvotes-comments">
                        <div className='quiz-upvotes'>
                            <button onClick={handleUpvoteClick}>
                                <i class="fa-solid fa-arrow-up"></i>
                                {upvotes}
                            </button>
                            <button onClick={handleDownvoteClick}>
                                <i class="fa-solid fa-arrow-down"></i>
                                {downvotes}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='quiz-statistics'>
                    <p>30 people have taken this quiz</p>
                    <p>The most popular result is Anne Duchene</p>
                </div>
            </div>
            <img className="quiz-thumbnail" src={props.thumbnail_img} alt="quiz-thumbnail"></img>
            <CommentList comments={comments}/>
        </div >
    )
}
export default QuizInfo;