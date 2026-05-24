import { getTestReport } from '../utils/testReports.js';
import TestReportContent from './TestReportContent.jsx';

export default function EvaluationSheet({
  testId,
  testTitle,
  onStartNewAttempt,
  onBackToDashboard,
}) {
  const report = getTestReport(testId);

  if (!report) {
    return (
      <main className="evaluation-sheet">
        <p>Report not found for {testTitle}.</p>
        <div className="evaluation-footer">
          <button type="button" className="btn btn-primary" onClick={onBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="evaluation-sheet">
      <TestReportContent report={report} />
      <div className="evaluation-footer">
        <button type="button" className="btn btn-ghost" onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
        <button type="button" className="btn btn-primary" onClick={onStartNewAttempt}>
          Start New Attempt
        </button>
      </div>
    </main>
  );
}
