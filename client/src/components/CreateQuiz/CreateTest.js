import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import CreateTestQuestion from './CreateTestQuestion';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreateTest(props) {
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [questions, setQuestions] = useState([{ id: 1, tableData: [], imagePreview: '' }]);
    const [numQuestions, setNumQuestions] = useState(1);

    const handleTableDataChange = useCallback((questionNumber, tableData) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) => (question.id === questionNumber ? { ...question, tableData } : question))
        );
    }, []);

    const handleImagePreviewChange = useCallback((questionNumber, imagePreview) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) => (question.id === questionNumber ? { ...question, imagePreview } : question))
        );
    }, []);

    const handleSubmitQuiz = async () => {
        const quizData = {
            title: document.getElementById("quiz_title").value,
            creator: props.user,
            quiz_type: "test",
            //thumbnail: thumbnailPreview,
            questions: questions.map((q) => {
            const options = q.tableData.map((td) => {
                return { option: td.option, correct: td.correct };
            });
            return {
                id: q.id,
                //image: q.imagePreview,
                question: document.getElementById(`question${q.id}`).value,
                options,
            };
            }),
        };
        
        console.log("quizData:", quizData);
        
        try {
            const response = await fetch("http://localhost:3000/created_quizzes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quizData),
            });
        
            if (!response.ok) {
                throw new Error(`Request failed with status code ${response.status}`);
            }
        
            console.log("Quiz submitted successfully!");
            // Redirect to a success page or something similar
        } catch (err) {
            console.error("Failed to submit quiz:", err);
        }
    };
  
    const handleFileUpload = (event) => {
      setThumbnail(event.target.files[0]);
    };
  
    useEffect(() => {
      // Create a URL for the uploaded file
      if (thumbnail) {
        const reader = new FileReader();
        reader.onload = () => {
          setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(thumbnail);
      } else {
        setThumbnailPreview(null);
      }
    }, [thumbnail]);
  
    const handleAddQuestion = () => {
        const lastQuestion = questions[questions.length - 1];
        const newQuestion = { id: lastQuestion.id + 1, tableData: [], imagePreview: '' };
        setQuestions([...questions, newQuestion]);
        setNumQuestions(numQuestions + 1);
    };
  
    const handleRemoveQuestion = () => {
      const newQuestions = [...questions];
      newQuestions.pop();
      setQuestions(newQuestions);
      setNumQuestions(numQuestions - 1);
    };
  
    return (
      <div className='create-quiz-container'>
        <div className='quiz-name-container'>
          Name Your Quiz
          <input type='text' name='quiz_title' id='quiz_title' />
        </div>
        <div className='quiz-thumbnail-upload'>
          <label htmlFor='thumbnail'>Upload Thumbnail</label>
          <input type='file' id='thumbnail' name='thumbnail' onChange={handleFileUpload} />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt='Thumbnail Preview'
              style={{ marginTop: '10px', maxWidth: '400px', height: '200px' }}
            />
          )}
        </div>
        <div className='quiz-name-container'>
            Create Your Quiz
        </div>
        {questions.map((question) => (
            <CreateTestQuestion
                key={question.id}
                questionNumber={question.id}
                onTableDataChange={handleTableDataChange}
                onImagePreviewChange={handleImagePreviewChange}
            />
        ))}
        <div className='quiz-modify-questions-buttons-container'>
            <button className='quiz-modify-questions-button' onClick={handleAddQuestion}>
                Add Question
            </button>
            {numQuestions > 1 && (
                <button className='quiz-modify-questions-button' onClick={handleRemoveQuestion}>
                Remove Question
                </button>
            )}
        </div>
        <div className='quiz-submit-button-container'>
            <button className='quiz-submit-button' onClick={handleSubmitQuiz}>
                Submit Quiz
            </button>
        </div>
      </div>
    );
}

export default CreateTest;