import { useCallback, useEffect, useMemo, useState } from 'react';
import rawQuestions from './questions.md?raw';
import { parseQuestions } from './parser.js';
import { useExamPersistence } from './hooks/useExamPersistence.js';
import Header from './components/Header.jsx';
import QuestionPanel from './components/QuestionPanel.jsx';
import QuestionPalette from './components/QuestionPalette.jsx';
import ActionBar from './components/ActionBar.jsx';
import ScoreModal from './components/ScoreModal.jsx';

const questions = parseQuestions(rawQuestions);

function getStatus(questionStatus, index) {
  return questionStatus[index] ?? 'Not Visited';
}

function setStatusAt(setQuestionStatus, index, status) {
  setQuestionStatus((prev) => ({ ...prev, [index]: status }));
}

export default function App() {
  const {
    hydrated,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswers,
    questionStatus,
    setQuestionStatus,
    timeLeft,
    setTimeLeft,
    resetExam,
  } = useExamPersistence(questions.length);

  const [pendingSelection, setPendingSelection] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const savedAnswerIndex = userAnswers[currentQuestionIndex];
  const selectedOptionIndex =
    pendingSelection !== null ? pendingSelection : savedAnswerIndex ?? null;

  useEffect(() => {
    if (!hydrated) return;
    setPendingSelection(
      userAnswers[currentQuestionIndex] !== undefined
        ? userAnswers[currentQuestionIndex]
        : null
    );
  }, [hydrated, currentQuestionIndex, userAnswers]);

  useEffect(() => {
    if (!hydrated || submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [hydrated, submitted, timeLeft, setTimeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && hydrated && !submitted) {
      setSubmitted(true);
      setShowScoreModal(true);
    }
  }, [timeLeft, hydrated, submitted]);

  const markVisitedIfNeeded = useCallback(
    (index) => {
      const status = getStatus(questionStatus, index);
      if (status === 'Not Visited') {
        setStatusAt(setQuestionStatus, index, 'Skipped');
      }
    },
    [questionStatus, setQuestionStatus]
  );

  const goToQuestion = useCallback(
    (nextIndex) => {
      if (nextIndex === currentQuestionIndex) return;
      markVisitedIfNeeded(currentQuestionIndex);
      setCurrentQuestionIndex(nextIndex);
      setPendingSelection(
        userAnswers[nextIndex] !== undefined ? userAnswers[nextIndex] : null
      );
    },
    [
      currentQuestionIndex,
      markVisitedIfNeeded,
      setCurrentQuestionIndex,
      userAnswers,
    ]
  );

  const goToNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, totalQuestions, goToQuestion]);

  const handleSelectOption = (optionIndex) => {
    if (submitted) return;
    setPendingSelection(optionIndex);
  };

  const handleMarkAndNext = () => {
    if (submitted) return;
    setStatusAt(setQuestionStatus, currentQuestionIndex, 'Marked');
    if (pendingSelection !== null) {
      setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: pendingSelection }));
    }
    goToNext();
  };

  const handleClearResponse = () => {
    if (submitted) return;
    setPendingSelection(null);
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestionIndex];
      return next;
    });
    setStatusAt(setQuestionStatus, currentQuestionIndex, 'Skipped');
  };

  const handleSaveAndNext = () => {
    if (submitted) return;
    if (pendingSelection === null) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: pendingSelection }));
    setStatusAt(setQuestionStatus, currentQuestionIndex, 'Answered');
    goToNext();
  };

  const handleSubmit = () => {
    markVisitedIfNeeded(currentQuestionIndex);
    setSubmitted(true);
    setShowScoreModal(true);
  };

  const scoreStats = useMemo(() => {
    let score = 0;
    let answered = 0;
    let marked = 0;
    let skipped = 0;

    questions.forEach((q, index) => {
      const status = getStatus(questionStatus, index);
      if (status === 'Answered') answered += 1;
      if (status === 'Marked') marked += 1;
      if (status === 'Skipped') skipped += 1;

      const userIndex = userAnswers[index];
      if (userIndex !== undefined && userIndex === q.correctAnswerIndex) {
        score += 1;
      }
    });

    const notVisited = totalQuestions - answered - marked - skipped;

    return { score, answered, marked, skipped: skipped + notVisited };
  }, [questionStatus, userAnswers, totalQuestions]);

  if (!hydrated) {
    return (
      <div className="exam-loading">
        <p>Loading exam session…</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="exam-loading">
        <p>No questions found. Check questions.md format.</p>
      </div>
    );
  }

  return (
    <div className={`exam-app ${submitted ? 'exam-submitted' : ''}`}>
      <Header timeLeft={timeLeft} />

      <main className="exam-body">
        <div className="exam-main">
          <QuestionPanel
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            selectedOptionIndex={selectedOptionIndex}
            onSelectOption={handleSelectOption}
          />
        </div>
        <QuestionPalette
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          questionStatus={questionStatus}
          onJumpTo={goToQuestion}
          onSubmit={handleSubmit}
        />
      </main>

      <ActionBar
        onMarkAndNext={handleMarkAndNext}
        onClearResponse={handleClearResponse}
        onSaveAndNext={handleSaveAndNext}
        isLastQuestion={currentQuestionIndex === totalQuestions - 1}
      />

      {showScoreModal && (
        <ScoreModal
          score={scoreStats.score}
          total={totalQuestions}
          answered={scoreStats.answered}
          marked={scoreStats.marked}
          skipped={scoreStats.skipped}
          onClose={() => setShowScoreModal(false)}
          onReset={() => {
            resetExam();
            setSubmitted(false);
            setShowScoreModal(false);
            setPendingSelection(null);
          }}
        />
      )}
    </div>
  );
}
