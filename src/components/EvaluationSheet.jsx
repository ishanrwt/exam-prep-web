import {
  getUserAnswerDisplay,
  isAnswerCorrect,
  isAutoGraded,
} from '../utils/answerUtils.js';

function PreBlock({ children, className = '' }) {
  if (!children) return <span className="evaluation-unanswered">Not provided</span>;
  return <pre className={`evaluation-pre ${className}`.trim()}>{children}</pre>;
}

export default function EvaluationSheet({
  testTitle,
  questions,
  userAnswers,
  onStartNewAttempt,
  onBackToDashboard,
}) {
  const gradable = questions.filter(isAutoGraded);
  let correctCount = 0;

  const rows = questions.map((question, index) => {
    const userAnswer = userAnswers[index];
    const userSelectedText = getUserAnswerDisplay(question, userAnswer);
    const isCode = question.type === 'CODE';
    const correct = isCode ? null : isAnswerCorrect(question, userAnswer);
    if (correct === true) correctCount += 1;

    return {
      question,
      userSelectedText,
      isCorrect: correct,
      isCode,
    };
  });

  const percentage =
    gradable.length > 0 ? Math.round((correctCount / gradable.length) * 100) : 0;

  return (
    <main className="evaluation-sheet">
      <div className="evaluation-header">
        <h2>Evaluation Sheet</h2>
        {testTitle && <p className="evaluation-test-name">{testTitle}</p>}
        <p className="evaluation-subtitle">
          Review your responses and explanations. Coding questions are for self-review only.
        </p>
      </div>

      <div className="evaluation-score-card">
        <div className="evaluation-score-main">
          <span className="evaluation-score-value">
            {correctCount} / {gradable.length}
          </span>
          <span className="evaluation-score-label">
            Auto-graded correct
            {questions.some((q) => q.type === 'CODE') &&
              ` (${questions.length - gradable.length} coding skipped)`}
          </span>
        </div>
        <span className="evaluation-score-percent">{percentage}%</span>
      </div>

      <ul className="evaluation-list">
        {rows.map(({ question, userSelectedText, isCorrect, isCode }) => (
          <li
            key={question.id}
            className={`evaluation-item ${
              isCode
                ? 'evaluation-item--code'
                : isCorrect
                  ? 'evaluation-item--correct'
                  : 'evaluation-item--incorrect'
            }`}
          >
            <div className="evaluation-item-header">
              <span className="evaluation-item-id">{question.id}</span>
              <span
                className={`evaluation-badge ${
                  isCode
                    ? 'badge-review'
                    : isCorrect
                      ? 'badge-correct'
                      : 'badge-incorrect'
                }`}
              >
                {isCode ? 'Self review' : isCorrect ? 'Correct' : 'Incorrect'}
              </span>
              <span className="evaluation-type-tag">{question.type}</span>
            </div>
            <div className="evaluation-question-text evaluation-question-text--pre">
              {question.text}
            </div>
            <dl className="evaluation-details">
              <div
                className={`evaluation-detail-row ${isCode ? 'evaluation-detail-row--stacked' : ''}`}
              >
                <dt>{isCode ? 'Your solution' : 'Your answer'}</dt>
                <dd>
                  {isCode ? (
                    <PreBlock>{userSelectedText}</PreBlock>
                  ) : (
                    <span className={userSelectedText ? '' : 'evaluation-unanswered'}>
                      {userSelectedText ?? 'Not answered'}
                    </span>
                  )}
                </dd>
              </div>
              {!isCode && (
                <div className="evaluation-detail-row">
                  <dt>Correct answer</dt>
                  <dd>{question.correctAnswer || '—'}</dd>
                </div>
              )}
              {question.explanation && (
                <div className="evaluation-detail-row evaluation-detail-row--stacked evaluation-explanation">
                  <dt>{isCode ? 'Optimal solution' : 'Explanation'}</dt>
                  <dd>
                    <PreBlock className="evaluation-pre--solution">
                      {question.explanation}
                    </PreBlock>
                  </dd>
                </div>
              )}
            </dl>
          </li>
        ))}
      </ul>

      <div className="evaluation-footer">
        <button type="button" className="btn btn-ghost" onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
        <button type="button" className="btn btn-primary" onClick={onStartNewAttempt}>
          Start New Attempt
        </button>
      </div>
    </main>
  );
}
