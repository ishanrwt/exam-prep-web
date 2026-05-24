import { useCallback, useEffect, useState } from 'react';
import { getAllReports, getTestReport } from '../utils/testReports.js';
import TestReportContent from './TestReportContent.jsx';

export default function ReportsHub({ onBack }) {
  const [reports, setReports] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const refresh = useCallback(() => {
    setReports(getAllReports());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const selectedReport = selectedTestId ? getTestReport(selectedTestId) : null;

  if (selectedReport) {
    return (
      <div className="dashboard dashboard-scroll reports-hub">
        <header className="dashboard-header dashboard-header--left">
          <button
            type="button"
            className="btn btn-ghost dashboard-back-btn"
            onClick={() => setSelectedTestId(null)}
          >
            ← All reports
          </button>
          <h1>Report detail</h1>
        </header>
        <main className="evaluation-sheet evaluation-sheet--embedded">
          <TestReportContent report={selectedReport} />
        </main>
        <div className="reports-hub-footer">
          <button type="button" className="btn btn-ghost" onClick={() => setSelectedTestId(null)}>
            Back to report list
          </button>
          <button type="button" className="btn btn-primary" onClick={onBack}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard dashboard-scroll reports-hub">
      <header className="dashboard-header dashboard-header--left">
        <button type="button" className="btn btn-ghost dashboard-back-btn" onClick={onBack}>
          ← Home
        </button>
        <h1>Your test reports</h1>
        <p className="dashboard-subtitle">
          Full breakdown of correct and incorrect answers for each completed test.
        </p>
      </header>

      {reports.length === 0 ? (
        <div className="reports-empty">
          <p>No reports yet. Complete a test and submit it to see your full answer review here.</p>
          <button type="button" className="btn btn-primary" onClick={onBack}>
            Choose a test
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {reports.map((report) => {
            const wrong = report.items.filter((i) => i.status === 'incorrect').length;
            const right = report.items.filter((i) => i.status === 'correct').length;
            return (
              <article key={report.testId} className="dashboard-card dashboard-card--report">
                <div className="dashboard-card-body">
                  <h2 className="dashboard-card-title">{report.testTitle}</h2>
                  <p className="dashboard-card-description">
                    {new Date(report.completedAt).toLocaleDateString(undefined, {
                      dateStyle: 'medium',
                    })}{' '}
                    · {new Date(report.completedAt).toLocaleTimeString(undefined, {
                      timeStyle: 'short',
                    })}
                  </p>
                  <div className="dashboard-card-score">
                    Score: {report.score} / {report.total} ({report.percentage}%)
                  </div>
                  <div className="report-summary-chips report-summary-chips--compact">
                    <span className="report-chip report-chip--correct">{right} correct</span>
                    <span className="report-chip report-chip--incorrect">{wrong} wrong</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary dashboard-card-btn"
                  onClick={() => setSelectedTestId(report.testId)}
                >
                  View full report
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
