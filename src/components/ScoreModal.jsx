import React from 'react';

export default function ScoreModal({ score, total, answered, marked, skipped, onClose, onReset }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="score-title">
      <div className="modal-content">
        <h2 id="score-title">Test Submitted</h2>
        <div className="score-summary">
          <div className="score-main">
            <span className="score-value">
              {score} / {total}
            </span>
            <span className="score-percent">SCORE: {percentage}%</span>
          </div>
          <ul className="score-breakdown">
            <li>
              <strong>Correct Answers:</strong>
              <span>{score}</span>
            </li>
            <li>
              <strong>Total Questions:</strong>
              <span>{total}</span>
            </li>
            <li>
              <strong>Answered:</strong>
              <span>{answered}</span>
            </li>
            <li>
              <strong>Marked for Review:</strong>
              <span>{marked}</span>
            </li>
            <li>
              <strong>Skipped / Unanswered:</strong>
              <span>{skipped}</span>
            </li>
          </ul>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onReset}>
            Start New Attempt
          </button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
}
