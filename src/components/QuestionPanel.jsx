export default function QuestionPanel({
  question,
  questionIndex,
  totalQuestions,
  sectionLabel = 'Section',
  answerValue,
  onAnswerChange,
  disabled = false,
}) {
  if (!question) return null;

  const isFub = question.type === 'FUB';
  const isCode = question.type === 'CODE';
  const textValue = typeof answerValue === 'string' ? answerValue : '';

  const typeLabel = isCode ? 'Coding' : isFub ? 'Fill Up the Box' : 'MCQ';
  const typeClass = isCode
    ? 'question-type-pill--code'
    : isFub
      ? 'question-type-pill--fub'
      : '';

  return (
    <div className={`question-panel ${disabled ? 'question-panel--disabled' : ''}`}>
      <div className="question-header">
        <div className="question-meta">
          <h2 className="question-number">
            {question.id} — Question {questionIndex + 1} of {totalQuestions}
          </h2>
          <span className="question-section-pill">{sectionLabel}</span>
          <span className={`question-type-pill ${typeClass}`}>{typeLabel}</span>
        </div>
        <div className="question-text question-text--pre">{question.text}</div>
      </div>

      <div className="options-container">
        {isCode ? (
          <div className="code-input-wrap">
            <label className="code-label" htmlFor={`code-${questionIndex}`}>
              Paste your solution (solve locally in your IDE first)
            </label>
            <textarea
              id={`code-${questionIndex}`}
              className="code-textarea"
              rows={15}
              value={textValue}
              onChange={(e) => onAnswerChange(e.target.value)}
              disabled={disabled}
              placeholder="// Paste your final code here"
              spellCheck={false}
            />
          </div>
        ) : isFub ? (
          <div className="fub-input-wrap">
            <label className="fub-label" htmlFor={`fub-${questionIndex}`}>
              Your answer
            </label>
            <input
              id={`fub-${questionIndex}`}
              type="text"
              className="fub-input"
              value={textValue}
              onChange={(e) => onAnswerChange(e.target.value)}
              disabled={disabled}
              placeholder="Type your answer here"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        ) : (
          <ul className="options-list">
            {question.options.map((option, index) => (
              <li key={index}>
                <label
                  className={`option-label ${answerValue === index ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={answerValue === index}
                    onChange={() => onAnswerChange(index)}
                    disabled={disabled}
                  />
                  <span className="option-text">{option.text}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
