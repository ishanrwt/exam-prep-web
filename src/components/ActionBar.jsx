import React from 'react';

export default function ActionBar({
  onMarkAndNext,
  onClearResponse,
  onSaveAndNext,
  isLastQuestion,
}) {
  return (
    <footer className="action-bar">
      <div className="action-bar-inner">
        <div className="footer-copyright">
          © 2024 TCS NQT Mock Assessment
        </div>
        <div className="action-buttons">
          <button type="button" className="btn btn-outline-primary" onClick={onMarkAndNext}>
            Mark for Review &amp; Next
          </button>
          <button type="button" className="btn btn-ghost" onClick={onClearResponse}>
            Clear Response
          </button>
          <button type="button" className="btn btn-primary" onClick={onSaveAndNext}>
            {isLastQuestion ? 'Save' : 'Save & Next'}
          </button>
        </div>
      </div>
    </footer>
  );
}
