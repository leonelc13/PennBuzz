import React from 'react';
import './style.css';

const QuizSelectBox = ({ topText, middleImage, bottomText, onClick, selected }) => {
    return (
      <div
        className={`quiz-select-box ${selected ? 'selected' : ''}`}
        onClick={onClick}
      >
        <div className="box-text-top">{topText}</div>
        <img src={middleImage} alt="Box Content" className="box-image" />
        <div className="box-text-bottom">{bottomText}</div>
      </div>
    );
  };

export default QuizSelectBox;