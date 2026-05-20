const STATUS_CLASS = {
  'Not Visited': 'palette-not-visited',
  Answered: 'palette-answered',
  Marked: 'palette-marked',
  Skipped: 'palette-skipped',
};

export default function QuestionPalette({
  totalQuestions,
  sectionLabel = 'Section',
  currentQuestionIndex,
  questionStatus,
  onJumpTo,
  onSubmit,
  disabled = false,
}) {
  return (
    <aside className={`question-palette ${disabled ? 'question-palette--disabled' : ''}`}>
      <div className="palette-header">
        <div className="palette-info">
          <h3 className="palette-title">Question Palette</h3>
          <span className="palette-section-label">Section: {sectionLabel}</span>
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
              disabled={disabled}
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

        <button type="button" className="btn-submit" onClick={onSubmit} disabled={disabled}>
          Submit Test
        </button>
      </div>
    </aside>
  );
}
