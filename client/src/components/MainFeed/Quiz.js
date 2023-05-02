import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { deleteDownvote, addDownvote, deleteUpvote, addUpvote } from '../../api/QuizAPI';
/**
 * React Component for Header displayed to a logged in user
 **/


function Quiz(props) {

    const [isUpvoted, setIsUpvoted] = useState(props.is_upvote ? props.is_upvote : false);
    const [isDownvoted, setIsDownvoted] = useState(props.is_downvote ? props.is_downvote : false);

    const [upvotes, setUpvotes] = useState(props.num_upvotes);
    const [downvotes, setDownvotes] = useState(props.num_downvotes)


    const handleUpvote = async (event) => {
        if (isUpvoted) {
            return deleteUpvote(props.id, props.username).then(data => {
                setUpvotes(upvotes - 1);
                setIsUpvoted(false);
            }).catch(error => {
                console.log("An error occured while deleting downvote: " + error);
            });
        }
        return addUpvote(props.id, props.username).then(data => {
            setUpvotes(upvotes + 1);
            return setIsUpvoted(true);
        }).catch(error => {
            console.log("An error occured while adding downvote: " + error);
        });
    }

    const handleDownvote = async (event) => {
        if (isDownvoted) {
            return deleteDownvote(props.id, props.username).then(data => {
                setDownvotes(downvotes - 1);
                return setIsDownvoted(false);
            }).catch(error => {
                console.log("An error occured while deleting downvote: " + error);
            });
        }
        return addDownvote(props.id, props.username).then(data => {
            setDownvotes(downvotes + 1);
            return setIsDownvoted(true);
        }).catch(error => {
            console.log("An error occured while adding downvote: " + error);
        });
    }

    return (
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

                    <Link to={`/quiz/${props.id}`}>
                        <button className="quiz-take-quiz-button">
                            Take Quiz
                        </button>
                    </Link>
                    <div className="quiz-upvotes-comments">
                        <div className='quiz-upvotes'>
                            <button onClick={handleUpvote} className={`quiz-upvotes-button ${isUpvoted && 'selected-vote-button'}`}>
                                <i className="fa-solid fa-arrow-up"></i>
                                {upvotes}
                            </button>
                            <button onClick={handleDownvote} className={`quiz-upvotes-button ${isDownvoted && 'selected-vote-button'}`}>
                                <i className="fa-solid fa-arrow-down"></i>
                                {downvotes}
                            </button>
                        </div>

                        <Link to={`/quiz/${props.id}`}>
                            See all {props.num_comments} comments
                        </Link>

                    </div>
                </div>
            </div>
            <img className="quiz-thumbnail" src={props.thumbnail_img} alt="quiz-thumbnail"></img>
        </div >
    );
}

export default Quiz