import React, { Component } from 'react';
import './style.css';
/**
 * React Component for Header displayed to a logged in user
 **/


class MainFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upvotes: props.upvotes,
            downvotes: props.downvotes,
        }
    }


    render() {
        return (
            <div className="quiz-container">
                <div className="quiz-header-container">
                    <span className="quiz-author">
                        <span className="quiz-author-img-wrapper">
                            <img src={this.props.author_img} alt="author profile picture"></img>
                        </span>
                        {this.props.author_name}
                    </span>
                    <span className="quiz-labels-container">
                        {
                            this.props.labels.map(label => (
                                <div >{label}</div>
                            ))
                        }
                    </span>
                </div>
                <div className="quiz-information">
                    <div className="quiz-text">
                        <span className="quiz-title">{this.props.title}</span>
                        <span className="quiz-description">{this.props.description}</span>
                    </div>
                    <div className="quiz-buttons">
                        <button className="quiz-take-quiz-button">
                            Take Quiz
                        </button>
                        <div className="quiz-upvotes-comments">
                            <div className='quiz-upvotes'>
                                <button >
                                    <i class="fa-solid fa-arrow-up"></i>
                                    {this.props.upvotes}
                                </button>
                                <button>
                                    <i class="fa-solid fa-arrow-down"></i>
                                    {this.props.downvotes}
                                </button>
                            </div>
                            <a>See all {this.props.num_comments} comments</a>
                        </div>
                    </div>
                </div>
                <img className="quiz-thumbnail" src={this.props.thumbnail_img} alt="quiz-thumbnail"></img>
            </div >
        );
    }
}

export default MainFeed