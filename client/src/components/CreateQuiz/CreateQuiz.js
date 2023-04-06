import React, { useState } from 'react';
import './style.css';
import QuizSelectbox from './QuizSelectBox.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreateQuiz(props) {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (value) => {
        setSelectedBox(value);
    };

    return (
        <div className='create-quiz-container'>
            <div className='quiz-select-title'>
                Choose Quiz Type
            </div>
            <div className='quiz-type-container'>
                {/*
                <QuizSelectbox
                    topText="Multiple Choice"
                    middleImage="https://drive.google.com/uc?id=1P5kBK8j_09HQlK4IVufTQE2M-ssWD7nZ&export=download"
                    bottomText="The classic personality quiz"
                    onClick={() => handleBoxClick('multiple_choice')}
                    selected={selectedBox === 'multiple_choice'}
                />*/}
                <QuizSelectbox
                    topText="Test"
                    middleImage="https://drive.google.com/uc?id=1P5kBK8j_09HQlK4IVufTQE2M-ssWD7nZ&export=download"
                    bottomText="There is a correct answer"
                    onClick={() => handleBoxClick('test')}
                    selected={selectedBox === 'test'}
                />
            </div>
            <Link to={`/create_quiz/${selectedBox}`}>
                <button className='quiz-create-button'>Continue</button>
            </Link>
        </div>
    );
}

export default CreateQuiz;