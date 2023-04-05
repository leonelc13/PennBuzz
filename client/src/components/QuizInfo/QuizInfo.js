import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TakeQuiz from '../TakeQuiz/TakeQuiz';
import CommentList from '../Comments/CommentList';
import './quizStyle.css'
import axios from 'axios';

function QuizInfo(props) {
    // Initialize states
    const [inQuiz, setInQuiz] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [quizData, setQuizData] = useState({});
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    const quizId = useRef('');
    quizId.current = useParams().id;

    // mock backend quizData retrieval
    useEffect(() => {
        axios.get(`http://localhost:3000/quiz?id=${quizId.current}`)
            .then(response => {
                setQuizData(response.data[0]);
                setComments(response.data[0].comments);
                setUpvotes(response.data[0].upvotes);
                setDownvotes(response.data[0].downvotes);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });

    }, [quizData.current]);

    // Updates upvote number
    function handleUpvoteClick(e) {
        axios.post(`http://localhost:3000/quiz?id=${quizId.current}`, { upvotes: quizData.upvotes + 1 })
            .then(response => {
                setUpvotes(response.data.upvotes);
                setQuizData({ ...quizData, upvotes: response.data.upvotes });
            })
            .catch(error => {
                console.error('Error upvoting: ', error);
            });
    }

    // Updates downvote number
    function handleDownvoteClick(e) {
        axios.post(`http://localhost:3000/quiz?id=${quizId.current}`, {
            downvotes: quizData.downvotes + 1
        })
            .then(response => {
                setDownvotes(response.data.downvotes);
                setQuizData({ ...quizData, downvotes: response.data.downvotes });
            })
            .catch(error => {
                console.error('Error downvoting: ', error);
            });
    }

    // updates comments 
    function handleAddComment(e) {
        axios.post(`http://localhost:3000/quiz?id=${quizId.current}/comments`, {
            author: props.user,
            content: newComment
        })
            .then(response => {
                setComments([...comments, response.data]);
                setQuizData({ ...quizData, comments: [...comments, response.data] });
            })
            .catch(error => {
                console.error('Error adding comment: ', error);
            });
    }

    // handles Take quiz click to trigger take quiz rendering
    function handleOnTakeQuizClick() {
        setInQuiz(true);
    }

    // handles back button when in TakeQuiz
    const handleBackButtonClick = (e) => {
        setInQuiz(false);
        setSubmitted(false);
    }

    // conditional rendering of take quiz
    if (inQuiz === true) {
        return (
            <div>
                <TakeQuiz title={quizData.title} questions={quizData.questions}
                    submitted={submitted} setSubmitted={setSubmitted} />
                <button className='quiz-take-quiz-button' onClick={handleBackButtonClick}>Back to Quiz Info</button>
            </div>
        );
    }

    // Loading screen while retrieving data
    if (!quizData) {
        return <div>Loading...</div>;
    } else {
        // default rendering of quiz info page
        return (
            <div className="quiz-info-container">
                <div className="quiz-info-header-container">
                    <span className="quiz-info-author">
                        <span className="quiz-info-author-img-wrapper">
                            <img src={quizData.author_img} alt="author profile picture"></img>
                        </span>
                        {quizData.author_name}
                    </span>
                    <span className="quiz-info-labels-container">
                        {/*
                        quizData.labels.map(label => (
                            <div >{label}</div>
                        ))

                        */}
                    </span>
                </div>
                <div className="quiz-info-information">
                    <div className="quiz-info-text">
                        <span className="quiz-info-title">{quizData.title}</span>
                        <span className="quiz-info-description">{quizData.description}</span>
                    </div>
                    <div className="quiz-info-buttons">
                        <button className="quiz-info-take-quiz-button" onClick={handleOnTakeQuizClick}>
                            Take Quiz
                        </button>
                        <div className="quiz-info-upvotes-comments">
                            <div className='quiz-info-upvotes'>
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
                    </div>
                </div>
                <img className="quiz-info-thumbnail" src={quizData.thumbnail_img} alt="quiz-info-thumbnail"></img>
                <CommentList comments={comments}
                    handleAddComment={handleAddComment}
                    newComment={newComment}
                    setNewComment={setNewComment} />
            </div >
        )

    }

}
export default QuizInfo;