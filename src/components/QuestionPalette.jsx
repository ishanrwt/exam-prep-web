import React from 'react';

const STATUS_CLASS = {
  'Not Visited': 'palette-not-visited',
  Answered: 'palette-answered',
  Marked: 'palette-marked',
  Skipped: 'palette-skipped',
};

export default function QuestionPalette({
  totalQuestions,
  currentQuestionIndex,
  questionStatus,
  onJumpTo,
  onSubmit, // Handled inside Palette now
}) {
  return (
    <aside className="question-palette">
      <div className="palette-header">
        <img 
          className="palette-avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiNWCcuC6atOZhsfxTJ_J__Q2t1n9QLwOLWplANQjNHXLVQvl_nLfQ9r32ElpWIinST8H-ls9Rz2rirThV1FWMdqcnrlBD4nR7YBgixGVz-bKEr_5QNdZqPqlD-ypIrzDbrvX4iUd0NjH4xwm-8Hdj6jkfpU-5S14VXrOICXr3TlusyoW4dzzS2oRWBCb353CWfD7Ref71JGjArP1kC5-9bgO3Kl6PsxaLDXx8VhpC6YGzOXhoQ2jhcdTGr9kPbJ1YEcwkNW-Jvaks" 
          alt="Candidate Side Avatar"
        />
        <div className="palette-info">
          <h3 className="palette-title">Question Palette</h3>
          <span className="palette-section-label">Section: Quantitative Aptitude</span>
        </div>
      </div>

      <div className="palette-grid">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const status = questionStatus[index] ?? 'Not Visited';
          const isActive = index === currentQuestionIndex;
          return (
            <button
              key={index}
              type="button"
              className={`palette-btn ${STATUS_CLASS[status] ?? 'palette-not-visited'} ${isActive ? 'palette-active' : ''}`}
              onClick={() => onJumpTo(index)}
              aria-label={`Question ${index + 1}: ${status}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="palette-footer">
        <div className="palette-legend">
          <div className="legend-item">
            <span className="legend-dot dot-not-visited"></span>
            <span>Not Visited</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-answered"></span>
            <span>Answered</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-skipped"></span>
            <span>Skipped</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-marked"></span>
            <span>Review</span>
          </div>
        </div>
        
        <button type="button" className="btn-submit" onClick={onSubmit}>
          Submit Test
        </button>
      </div>
    </aside>
  );
}
