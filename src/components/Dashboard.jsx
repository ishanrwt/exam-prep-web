import { useCallback, useEffect, useState } from 'react';
import { subjects, getTestsBySubject } from '../data/testIndex.js';
import { getAllCompletions } from '../utils/testCompletion.js';

function formatDuration(minutes) {
  if (minutes >= 60) {
    const hours = minutes / 60;
    return hours === 1 ? '1 hour' : `${hours} hours`;
  }
  return `${minutes} min`;
}

export default function Dashboard({ onTakeTest }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [completions, setCompletions] = useState({});

  const refreshCompletions = useCallback(() => {
    setCompletions(getAllCompletions());
  }, []);

  useEffect(() => {
    refreshCompletions();
  }, [refreshCompletions]);

  const selectedSubject = subjects.find((s) => s.subjectId === selectedSubjectId);
  const subjectTests = selectedSubjectId ? getTestsBySubject(selectedSubjectId) : [];

  const completedInSubject = subjectTests.filter((t) => completions[t.id]?.completed).length;

  if (selectedSubjectId && selectedSubject) {
    return (
      <div className="dashboard dashboard-scroll">
        <header className="dashboard-header dashboard-header--left">
          <button
            type="button"
            className="btn btn-ghost dashboard-back-btn"
            onClick={() => setSelectedSubjectId(null)}
          >
            ← All subjects
          </button>
          <h1>{selectedSubject.subjectName} Practice</h1>
          <p className="dashboard-subtitle">
            {selectedSubject.description} Choose a test below.
            {subjectTests.length > 0 && (
              <span className="dashboard-progress">
                {' '}
                {completedInSubject} of {subjectTests.length} completed
              </span>
            )}
          </p>
        </header>

        <div className="dashboard-grid">
          {subjectTests.map((test) => {
            const completion = completions[test.id];
            const isCompleted = Boolean(completion?.completed);

            return (
              <article
                key={test.id}
                className={`dashboard-card ${isCompleted ? 'dashboard-card--completed' : ''}`}
              >
                <div className="dashboard-card-body">
                  <div className="dashboard-card-title-row">
                    <h2 className="dashboard-card-title">
                      {test.title.replace(`${test.subjectName} - `, '')}
                    </h2>
                    {isCompleted ? (
                      <span className="dashboard-status-badge dashboard-status-badge--done">
                        Completed
                      </span>
                    ) : (
                      <span className="dashboard-status-badge dashboard-status-badge--pending">
                        Not completed
                      </span>
                    )}
                  </div>
                  {isCompleted && completion.score != null && (
                    <p className="dashboard-card-score">
                      Score: {completion.score} / {completion.total}
                    </p>
                  )}
                  <div className="dashboard-card-meta">
                    <span className="dashboard-meta-item">
                      <svg
                        className="dashboard-meta-icon"
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
                      {formatDuration(test.durationMinutes)}
                    </span>
                    <span className="dashboard-meta-item dashboard-meta-questions">
                      {test.questionCount} questions
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary dashboard-card-btn"
                  onClick={() => onTakeTest(test.id)}
                >
                  {isCompleted ? 'Retake Test' : 'Take Test'}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard dashboard-scroll">
      <header className="dashboard-header">
        <h1>TCS NQT Mock Tests</h1>
        <p className="dashboard-subtitle">
          Pick a subject to see available practice tests. Progress is saved in your browser.
        </p>
      </header>

      <div className="dashboard-grid dashboard-grid--subjects">
        {subjects.map((subject) => {
          const tests = getTestsBySubject(subject.subjectId);
          const done = tests.filter((t) => completions[t.id]?.completed).length;

          return (
            <article key={subject.subjectId} className="dashboard-card dashboard-card--subject">
              <div className="dashboard-card-body">
                <h2 className="dashboard-card-title">{subject.subjectName} Practice</h2>
                <p className="dashboard-card-description">{subject.description}</p>
                <div className="dashboard-card-meta">
                  <span className="dashboard-meta-item">
                    {subject.testCount} tests · {formatDuration(subject.durationMinutes)} each
                  </span>
                  {done > 0 && (
                    <span className="dashboard-meta-item dashboard-meta-complete">
                      {done}/{subject.testCount} completed
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary dashboard-card-btn"
                onClick={() => setSelectedSubjectId(subject.subjectId)}
              >
                View Tests
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
