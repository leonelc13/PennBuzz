import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
/**
 * React Component for Header displayed to a logged in user
 **/


function Quiz(props) {

    const [isUpvoted, setIsUpvoted] = useState(props.is_upvoted ? props.is_upvoted : false);
    const [isDownvoted, setIsDownvoted] = useState(props.is_downvoted ? props.is_downvoted : false);

    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes)


    const handleUpvote = (event) => {
        if (isUpvoted) {
            setUpvotes(upvotes - 1);
            return setIsUpvoted(false);
        }
        setUpvotes(upvotes + 1);
        return setIsUpvoted(true);
    }

    const handleDownvote = (event) => {
        if (isDownvoted) {
            setDownvotes(downvotes - 1);
            return setIsDownvoted(false);
        }
        setDownvotes(downvotes + 1);
        return setIsDownvoted(true);
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
                            <button onClick={handleUpvote} class={`quiz-upvotes-button ${isUpvoted && 'selected-vote-button'}`}>
                                <i className="fa-solid fa-arrow-up"></i>
                                {upvotes}
                            </button>
                            <button onClick={handleDownvote} class={`quiz-upvotes-button ${isDownvoted && 'selected-vote-button'}`}>
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