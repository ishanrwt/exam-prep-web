function PreBlock({ children, className = '' }) {
  if (!children) return <span className="evaluation-unanswered">Not provided</span>;
  return <pre className={`evaluation-pre ${className}`.trim()}>{children}</pre>;
}

function statusLabel(status) {
  switch (status) {
    case 'correct':
      return 'Correct';
    case 'incorrect':
      return 'Incorrect';
    case 'review':
      return 'Self review';
    default:
      return 'Not answered';
  }
}

function statusClass(status) {
  switch (status) {
    case 'correct':
      return 'evaluation-item--correct';
    case 'incorrect':
      return 'evaluation-item--incorrect';
    case 'review':
      return 'evaluation-item--code';
    default:
      return 'evaluation-item--unanswered';
  }
}

function badgeClass(status) {
  switch (status) {
    case 'correct':
      return 'badge-correct';
    case 'incorrect':
      return 'badge-incorrect';
    case 'review':
      return 'badge-review';
    default:
      return 'badge-unanswered';
  }
}

/**
 * Full question-by-question report (used after submit and on Reports page).
 */
export default function TestReportContent({ report }) {
  if (!report) return null;

  const correctCount = report.items.filter((i) => i.status === 'correct').length;
  const incorrectCount = report.items.filter((i) => i.status === 'incorrect').length;
  const unansweredCount = report.items.filter((i) => i.status === 'unanswered').length;
  const reviewCount = report.items.filter((i) => i.status === 'review').length;

  return (
    <>
      <div className="evaluation-header">
        <h2>Test Report</h2>
        {report.testTitle && <p className="evaluation-test-name">{report.testTitle}</p>}
        <p className="evaluation-subtitle">
          Completed {new Date(report.completedAt).toLocaleString()}
          {report.sectionLabel && ` · ${report.sectionLabel}`}
        </p>
      </div>

      <div className="evaluation-score-card">
        <div className="evaluation-score-main">
          <span className="evaluation-score-value">
            {report.score} / {report.total}
          </span>
          <span className="evaluation-score-label">Auto-graded correct</span>
        </div>
        <span className="evaluation-score-percent">{report.percentage}%</span>
      </div>

      <div className="report-summary-chips">
        <span className="report-chip report-chip--correct">{correctCount} correct</span>
        <span className="report-chip report-chip--incorrect">{incorrectCount} wrong</span>
        {unansweredCount > 0 && (
          <span className="report-chip report-chip--unanswered">{unansweredCount} unanswered</span>
        )}
        {reviewCount > 0 && (
          <span className="report-chip report-chip--review">{reviewCount} coding (self review)</span>
        )}
      </div>

      <ul className="evaluation-list">
        {report.items.map((item) => {
          const isCode = item.type === 'CODE';
          return (
            <li
              key={item.questionId}
              className={`evaluation-item ${statusClass(item.status)}`}
            >
              <div className="evaluation-item-header">
                <span className="evaluation-item-id">{item.questionId}</span>
                <span className={`evaluation-badge ${badgeClass(item.status)}`}>
                  {statusLabel(item.status)}
                </span>
                <span className="evaluation-type-tag">{item.type}</span>
              </div>
              <div className="evaluation-question-text evaluation-question-text--pre">
                {item.questionText}
              </div>
              <dl className="evaluation-details">
                <div
                  className={`evaluation-detail-row ${isCode ? 'evaluation-detail-row--stacked' : ''}`}
                >
                  <dt>{isCode ? 'Your solution' : 'Your answer'}</dt>
                  <dd>
                    {isCode ? (
                      <PreBlock>{item.userAnswerText}</PreBlock>
                    ) : (
                      <span
                        className={
                          item.userAnswerText ? 'report-answer-user' : 'evaluation-unanswered'
                        }
                      >
                        {item.userAnswerText ?? 'Not answered'}
                      </span>
                    )}
                  </dd>
                </div>
                <div
                  className={`evaluation-detail-row ${isCode ? 'evaluation-detail-row--stacked' : ''} ${
                    item.status === 'correct' ? 'report-row--highlight-correct' : ''
                  } ${item.status === 'incorrect' ? 'report-row--highlight-incorrect' : ''}`}
                >
                  <dt>Correct answer</dt>
                  <dd className="report-answer-correct">{item.correctAnswerText}</dd>
                </div>
                {item.status === 'incorrect' && item.userAnswerText && (
                  <div className="report-compare-banner report-compare-banner--wrong">
                    Your answer does not match the correct answer above.
                  </div>
                )}
                {item.status === 'correct' && (
                  <div className="report-compare-banner report-compare-banner--right">
                    Your answer matches the correct answer.
                  </div>
                )}
                {item.explanation && (
                  <div className="evaluation-detail-row evaluation-detail-row--stacked evaluation-explanation">
                    <dt>{isCode ? 'Optimal solution' : 'Explanation'}</dt>
                    <dd>
                      <PreBlock className="evaluation-pre--solution">{item.explanation}</PreBlock>
                    </dd>
                  </div>
                )}
              </dl>
            </li>
          );
        })}
      </ul>
    </>
  );
}
