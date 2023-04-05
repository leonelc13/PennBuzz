import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
/**
 * React Component for Header displayed to a logged in user
 **/


function Quiz(props) {

    const [upvoted, setUpvoted] = useState(props.is_upvoted ? props.is_upvoted : false);
    const [downvoted, setDownvoted] = useState(props.is_downvoted ? props.is_downvoted : false);




    const handleUpvote = (event) => {
        return setUpvoted(!upvoted)
    }

    const handleDownvote = (event) => {
        return setDownvoted(!downvoted)
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
                            <button onClick={handleUpvote} class={`quiz-upvotes-button ${upvoted && 'selected-vote-button'}`}>
                                <i className="fa-solid fa-arrow-up"></i>
                                {upvoted ? props.upvotes + 1 : props.upvotes}
                            </button>
                            <button onClick={handleDownvote} class={`quiz-upvotes-button ${downvoted && 'selected-vote-button'}`}>
                                <i className="fa-solid fa-arrow-down"></i>
                                {downvoted ? props.downvotes + 1 : props.downvotes}
                            </button>
                        </div>
                        <a>See all {props.num_comments} comments</a>
                    </div>
                </div>
            </div>
            <img className="quiz-thumbnail" src={props.thumbnail_img} alt="quiz-thumbnail"></img>
        </div >
    );
}

export default Quiz