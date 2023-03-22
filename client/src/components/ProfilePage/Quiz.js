import React, { useState } from 'react';
import StarCheckbox from './StarCheckbox';
import './style.css';

/**
 * React Component for Header displayed to a logged in user
 **/
function Quiz(props) {
    const { author_img, author_name, thumbnail_img, title } = props;

    const [favorite, setFavorite] = useState(props.favorite);

    return (
        <div className='quiz-item'>
            <div className="pp-quiz-header-container">
                <span className="pp-quiz-author">
                    <span className="pp-quiz-author-img-wrapper">
                        <img src={author_img} alt="author profile picture"></img>
                    </span>
                    {author_name}
                </span>
                <span class='quiz-favorite'>
                    <StarCheckbox />
                </span>
            </div>
            <div className='quiz-img-container'>
                <img src={thumbnail_img} alt="quiz-image"></img>
            </div>
            <div className='pp-quiz-footer-container'>
                <span className='pp-quiz-title'>{title}</span>
            </div>
        </div>
    );
}

export default Quiz;