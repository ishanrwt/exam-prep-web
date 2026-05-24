export default function Header({
  testTitle,
  timeLeft,
  timerStarted,
  isSubmitted,
  onStartTimer,
  onResetTimer,
  onBackToSelection,
}) {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const pad = (n) => String(n).padStart(2, '0');

  const isLow = timerStarted && timeLeft <= 300 && !isSubmitted;

  return (
    <header className="exam-header">
      <div className="header-left">
        {onBackToSelection && (
          <button
            type="button"
            className="btn btn-ghost header-back-btn"
            onClick={onBackToSelection}
          >
            ← Selection
          </button>
        )}
        <div className="header-brand">
          <h1>TCS NQT Mock</h1>
          {testTitle && <span className="header-test-title">{testTitle}</span>}
        </div>
      </div>
      <div className="header-actions">
        <div className={`header-timer ${isLow ? 'timer-warning' : ''}`} aria-live="polite">
          <svg
            className="timer-icon"
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
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="timer-value">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        </div>
        {!isSubmitted && (
          <div className="header-timer-controls">
            <button
              type="button"
              className="btn btn-primary btn-header"
              onClick={onStartTimer}
              disabled={timerStarted}
            >
              Start Timer
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-header"
              onClick={onResetTimer}
            >
              Reset Timer
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
