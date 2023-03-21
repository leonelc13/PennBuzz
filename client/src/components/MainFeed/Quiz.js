import React, { useState } from 'react';
import './style.css';
/**
 * React Component for Header displayed to a logged in user
 **/


function Quiz(props) {

    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes);

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
                    <button className="quiz-take-quiz-button">
                        Take Quiz
                    </button>
                    <div className="quiz-upvotes-comments">
                        <div className='quiz-upvotes'>
                            <button >
                                <i class="fa-solid fa-arrow-up"></i>
                                {upvotes}
                            </button>
                            <button>
                                <i class="fa-solid fa-arrow-down"></i>
                                {downvotes}
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