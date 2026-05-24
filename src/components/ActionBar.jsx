const PaletteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
    />
  </svg>
);

export default function ActionBar({
  onMarkAndNext,
  onClearResponse,
  onSaveAndNext,
  isLastQuestion,
  disabled = false,
  saveDisabled = false,
  onOpenQuestionPalette,
  paletteOpen = false,
}) {
  return (
    <footer className={`action-bar ${disabled ? 'action-bar--disabled' : ''}`}>
      <div className="action-bar-inner">
        {onOpenQuestionPalette && (
          <button
            type="button"
            className="mobile-palette-toggle"
            onClick={onOpenQuestionPalette}
            disabled={disabled}
            aria-label="Open question palette"
            aria-expanded={paletteOpen}
          >
            <PaletteIcon />
            Questions
          </button>
        )}
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
