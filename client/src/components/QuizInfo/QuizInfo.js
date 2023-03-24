import React, { useState, useEffect } from 'react';
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

    console.log(quizData);

    // mock backend quizData retrieval
    useEffect(() => {
        axios.get('http://localhost:3000/quizData',
        {
            params: {
                user: props.user
            }
        })
        .then(response => {
            setQuizData(response.data);
            setComments(response.data.comments);
            setUpvotes(response.data.upvotes);
            setDownvotes(response.data.downvote);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });

    }, [props.user]);
    
    // Loading screen while retrieving data
    if (!quizData) {
        return <div>Loading...</div>;
    }

    // Updates upvote number
    function handleUpvoteClick(e) {
        axios.post('http://localhost:3000/quizData', { upvotes: quizData.upvotes + 1 })
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
        axios.post('http://localhost:3000/quizData', { 
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
        axios.post('http://localhost:3000/quizData', {
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
                <TakeQuiz title={quiz.title} questions={quiz.questions} 
                        submitted={submitted} setSubmitted={setSubmitted}/>
                <button className='quiz-take-quiz-button' onClick={handleBackButtonClick}>Back to Quiz Info</button>
            </div>
        );
    }   

    // default rendering of quiz info page
    return(
        <div className="quiz-container">
            <div className="quiz-header-container">
                <span className="quiz-author">
                    <span className="quiz-author-img-wrapper">
                        <img src={quizData.author_img} alt="author profile picture"></img>
                    </span>
                    {quizData.author_name}
                </span>
                <span className="quiz-labels-container">
                    {
                        quizData.labels.map(label => (
                            <div >{label}</div>
                        ))
                    }
                </span>
            </div>
            <div className="quiz-information">
                <div className="quiz-text">
                    <span className="quiz-title">{quizData.title}</span>
                    <span className="quiz-description">{quizData.description}</span>
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
                    <p>{quiz.takenStat}</p>
                    <p>{quiz.topStat}</p>
                </div>
            </div>
            <img className="quiz-thumbnail" src={quiz.thumbnail_img} alt="quiz-thumbnail"></img>
            <CommentList comments={comments} 
                        handleAddComment={handleAddComment} 
                        newComment={newComment} 
                        setNewComment={setNewComment}/>
        </div >
    )
}
export default QuizInfo;