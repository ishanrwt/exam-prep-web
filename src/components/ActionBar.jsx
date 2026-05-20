export default function ActionBar({
  onMarkAndNext,
  onClearResponse,
  onSaveAndNext,
  isLastQuestion,
  disabled = false,
  saveDisabled = false,
}) {
  return (
    <footer className={`action-bar ${disabled ? 'action-bar--disabled' : ''}`}>
      <div className="action-bar-inner">
        <div className="footer-copyright">© 2024 TCS NQT Mock Assessment</div>
        <div className="action-buttons">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={onMarkAndNext}
            disabled={disabled}
          >
            Mark for Review &amp; Next
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClearResponse}
            disabled={disabled}
          >
            Clear Response
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSaveAndNext}
            disabled={disabled || saveDisabled}
          >
            {isLastQuestion ? 'Save' : 'Save & Next'}
          </button>
        </div>
      </div>
    </footer>
  );
}
