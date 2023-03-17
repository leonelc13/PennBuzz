import React, { Component } from 'react';
import StarCheckbox from './StarCheckbox';
import './style.css';
/**
 * React Component for Header displayed to a logged in user
 **/


class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: props.favorite,
        }
    }


    render() {
        return (
            <div className='quiz-item'>
                <div className="pp-quiz-header-container">
                    <span className="pp-quiz-author">
                        <span className="pp-quiz-author-img-wrapper">
                            <img src={this.props.author_img} alt="author profile picture"></img>
                        </span>
                        {this.props.author_name}
                    </span>
                    <span class= 'quiz-favorite'>
                        <StarCheckbox />
                    </span>
                </div>
                <div className='quiz-img-container'>
                    <img src={this.props.thumbnail_img} alt="quiz-image"></img>
                </div>
                <div className='pp-quiz-footer-container'> 
                    <span className='pp-quiz-title'>{this.props.title}</span>
                </div>
            </div>
        );
    }
}

export default ProfilePage