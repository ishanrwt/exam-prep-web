import { useCallback, useEffect, useState } from 'react';
import { subjects, getTestsBySubject } from '../data/testIndex.js';
import { getAllCompletions } from '../utils/testCompletion.js';
import { hasAnyReports } from '../utils/testReports.js';
import ReportsHub from './ReportsHub.jsx';

function formatDuration(minutes) {
  if (minutes >= 60) {
    const hours = minutes / 60;
    return hours === 1 ? '1 hour' : `${hours} hours`;
  }
  return `${minutes} min`;
}

export default function Dashboard({ onTakeTest }) {
  const [view, setView] = useState('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [completions, setCompletions] = useState({});
  const [hasReports, setHasReports] = useState(false);

  const refreshCompletions = useCallback(() => {
    setCompletions(getAllCompletions());
    setHasReports(hasAnyReports());
  }, []);

  useEffect(() => {
    refreshCompletions();
  }, [refreshCompletions]);

  if (view === 'reports') {
    return (
      <ReportsHub
        onBack={() => {
          setView('home');
          refreshCompletions();
        }}
      />
    );
  }

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
                      {formatDuration(test.durationMinutes)} · {test.questionCount} questions
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
          Pick a subject to practice, or review your past attempts with full answer breakdowns.
        </p>
      </header>

      <div className="dashboard-home-actions">
        <button
          type="button"
          className="btn btn-outline-primary dashboard-reports-btn"
          onClick={() => setView('reports')}
        >
          View your report
          {hasReports && <span className="dashboard-reports-dot" aria-hidden="true" />}
        </button>
      </div>

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
