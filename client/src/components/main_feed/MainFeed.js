import React, { Component } from 'react';
import './style.css';
import Quiz from './Quiz';
/**
 * React Component for Header displayed to a logged in user
 **/


let quizzes = [
    {
        title: "Which Penn Professor are you?",
        author_name: "johnwick",
        author_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
        description: "Complete this quiz and find out your soulmate professor at Penn!",
        upvotes: 87,
        downvotes: 12,
        num_comments: 7,
        labels: ["Penn", "Professors"],
        timestamp: "12/12/2023",
        thumbnail_img: "https://drive.google.com/uc?id=1Guf_k6yMjbbhvPU8A77tNhj9-plnW726"
    },
    {
        title: "Which Penn Professor are you?",
        author_name: "johnwick",
        author_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
        description: "Complete this quiz and find out your soulmate professor at Penn!",
        upvotes: 87,
        downvotes: 12,
        num_comments: 7,
        timestamp: "12/12/2023",
        labels: ["Penn", "Professors"],
        thumbnail_img: "https://drive.google.com/uc?id=1Guf_k6yMjbbhvPU8A77tNhj9-plnW726"
    }
];

class MainFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: quizzes
        }
    }


    render() {
        return (
            <div className="main-feed-container">
                {
                    this.state.quizzes.map(quiz => (
                        <Quiz {...quiz} />
                    ))
                }
            </div >
        );
    }
}

export default MainFeed