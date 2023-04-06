import React, { useState, useEffect } from 'react';
import './style.css';

const CreateTestQuestion = ({ questionNumber, onTableDataChange, onImagePreviewChange }) => {
  const [imagePreview, setImagePreview] = useState('');
  const [tableData, setTableData] = useState([{ option: '', correct: false }]);

  // Pass tableData to the parent component
  useEffect(() => {
    onTableDataChange(questionNumber, tableData);
  }, [tableData, onTableDataChange, questionNumber]);

  // Pass imagePreview to the parent component
  useEffect(() => {
    onImagePreviewChange(questionNumber, imagePreview);
  }, [imagePreview, onImagePreviewChange, questionNumber]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handleOptionChange = (event, index) => {
    const updatedData = [...tableData];
    updatedData[index].option = event.target.value;
    setTableData(updatedData);
  };

  const handleCorrectChange = (index) => {
    const updatedData = [...tableData];
    updatedData[index].correct = !updatedData[index].correct;
    setTableData(updatedData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { option: '', correct: false }]);
  };

  const handleRemoveRow = () => {
    setTableData(tableData.slice(0, -1));
  };

  return (
    <div className='test-question-container'>
      <div className='test-question-number'>
        Question {questionNumber}
      </div>
      <div className='test-question-left-panel'>
        <label htmlFor={`imageUpload${questionNumber}`}>Upload Image:</label>
        <input type='file' id={`imageUpload${questionNumber}`} onChange={handleImageUpload} />
        {imagePreview && (
          <img src={imagePreview} alt='Test Question Preview' style={{ marginTop: '10px', maxWidth: '350px', height: '200px' }} />
        )}
        <label htmlFor={`question${questionNumber}`}>Question:</label>
        <textarea id={`question${questionNumber}`} />
      </div>
      <div className='test-question-right-panel'>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input type='text' value={row.option} onChange={(event) => handleOptionChange(event, index)} />
                </td>
                <td>
                  <input type='checkbox' checked={row.correct} onChange={() => handleCorrectChange(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handleAddRow}>Add Option</button>
          {tableData.length > 1 && <button onClick={handleRemoveRow}>Remove Option</button>}
        </div>
      </div>
    </div>
  );
};

export default CreateTestQuestion;