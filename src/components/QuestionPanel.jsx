import React from 'react';

export default function QuestionPanel({
  question,
  questionIndex,
  totalQuestions,
  selectedOptionIndex,
  onSelectOption,
}) {
  if (!question) return null;

  return (
    <div className="question-panel">
      <div className="question-header">
        <div className="question-meta">
          <h2 className="question-number">Question {questionIndex + 1}</h2>
          <span className="question-section-pill">Quantitative Aptitude</span>
        </div>
        <p className="question-text">{question.text}</p>
      </div>
      
      <div className="options-container">
        <ul className="options-list">
          {question.options.map((option, index) => (
            <li key={index}>
              <label className={`option-label ${selectedOptionIndex === index ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  checked={selectedOptionIndex === index}
                  onChange={() => onSelectOption(index)}
                />
                <span className="option-text">{option.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
