import React, { Component } from 'react';
import './style.css';
import Quiz from './Quiz';
/**
 * React Component for Header displayed to a logged in user
 **/


let profile = 
    {
        profile_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
        name: "John Wick",
        biography: "John Wick is a legendary hitman and assassin, known for his unparalleled skills and deadly determination. Born into a life of crime, John worked for years as a hired killer, earning a reputation as the best in the business. However, when he decided to retire and start a new life with his wife, Helen, tragedy struck. After Helen passed away, John was left alone and brokenhearted.\n\nIn a final act of love, Helen arranged for a puppy to be delivered to John after her death, hoping it would provide him with some comfort and companionship. When a group of thugs broke into John's home, stole his car, and killed his beloved puppy, they unleashed the wrath of a man who had nothing left to lose."
    }


let quizzes = [
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

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: quizzes
        }
    }

    render() {
        return (
            <div className='profile-page-container'>
                <div className='profile-section'>
                    <div className="profile-image">
                        <img src={profile.profile_img} alt="profile pic" />
                        <p>{profile.name}</p>
                    </div>
                    <div className="profile-biography">
                        <p>{profile.biography}</p>
                    </div>
                </div>
                <div class="button-group">
                    <button>Created</button>
                    <button>Recent</button>
                    <button>Favorites</button>
                </div>
                <div className="pp-quiz-container">
                    {
                        this.state.quizzes.map(quiz => (
                            <Quiz {...quiz} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default ProfilePage