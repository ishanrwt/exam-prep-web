import { getTestById } from './data/testIndex.js';
import { useAppNavigation } from './hooks/useAppNavigation.js';
import Dashboard from './components/Dashboard.jsx';
import ExamScreen from './components/ExamScreen.jsx';

export default function App() {
  const {
    hydrated,
    selectedTestId,
    currentScreen,
    setCurrentScreen,
    startTest,
    goToDashboard,
  } = useAppNavigation();

  const selectedTest = selectedTestId ? getTestById(selectedTestId) : null;

  const handleTakeTest = (testId) => {
    startTest(testId);
  };

  const handleBackToDashboard = () => {
    goToDashboard();
  };

  if (!hydrated) {
    return (
      <div className="exam-loading">
        <p>Loading…</p>
      </div>
    );
  }

  if (selectedTestId === null) {
    return (
      <div className="app-shell app-shell--dashboard">
        <Dashboard onTakeTest={handleTakeTest} />
      </div>
    );
  }

  if (!selectedTest) {
    return (
      <div className="exam-loading">
        <p>Test not found.</p>
        <button type="button" className="btn btn-primary" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <ExamScreen
      test={selectedTest}
      currentScreen={currentScreen}
      setCurrentScreen={setCurrentScreen}
      onBackToDashboard={handleBackToDashboard}
    />
  );
}
