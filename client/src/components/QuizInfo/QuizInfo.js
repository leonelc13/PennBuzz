import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TakeQuiz from '../TakeQuiz/TakeQuiz';
import CommentList from '../Comments/CommentList';
import './quizStyle.css'
import axios from 'axios';
import { getQuiz, addComment, deleteDownvote, addDownvote, deleteUpvote, addUpvote } from '../../api/QuizAPI';

function QuizInfo(props) {
    // Initialize states
    const [inQuiz, setInQuiz] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [quizData, setQuizData] = useState({});
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0)

    const quizId = useRef();
    quizId.current = useParams().id;

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await getQuiz(quizId.current);
                setQuizData(res);
                setUpvotes(res.upvotes.length);
                setDownvotes(res.downvotes.length);
                setIsUpvoted(res.upvotes.includes(props.user));
                setIsDownvoted(res.downvotes.includes(props.user));
                setComments(res.comments);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchQuiz();
    }, [quizData.current]);


    const handleUpvote = async (event) => {
        if (isUpvoted) {
            return deleteUpvote(quizId.current, props.user).then(data => {
                setUpvotes(upvotes - 1);
                setIsUpvoted(false);
            }).catch(error => {
                console.log("An error occured while deleting downvote: " + error);
            });
        }
        return addUpvote(quizId.current, props.user).then(data => {
            setUpvotes(upvotes + 1);
            return setIsUpvoted(true);
        }).catch(error => {
            console.log("An error occured while adding downvote: " + error);
        });
    }

    const handleDownvote = async (event) => {
        if (isDownvoted) {
            return deleteDownvote(quizId.current, props.user).then(data => {
                setDownvotes(downvotes - 1);
                return setIsDownvoted(false);
            }).catch(error => {
                console.log("An error occured while deleting downvote: " + error);
            });
        }
        return addDownvote(quizId.current, props.user).then(data => {
            setDownvotes(downvotes + 1);
            return setIsDownvoted(true);
        }).catch(error => {
            console.log("An error occured while adding downvote: " + error);
        });
    }

    // updates comments 
    const handleAddComment = async (event) => {
        const timestamp = Date.now();
        return addComment(quizId.current, props.user, newComment, timestamp)
        .then(data => {
            console.log(data);
            setComments([...comments, {author: props.user, content: newComment, timestamp: timestamp}]);
            setQuizData({ ...quizData, comments: [...comments, {author: props.user, content: newComment, timestamp: timestamp}] });
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
                                <button onClick={handleUpvote} class={`quiz-upvotes-button ${isUpvoted && 'selected-vote-button'}`}>
                                    <i class="fa-solid fa-arrow-up"></i>
                                    {upvotes}
                                </button>
                                <button onClick={handleDownvote} class={`quiz-upvotes-button ${isDownvoted && 'selected-vote-button'}`}>
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