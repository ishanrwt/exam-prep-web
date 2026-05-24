import { useCallback, useEffect, useMemo, useState } from 'react';
import { hasValidAnswer, isTextAnswerType } from '../utils/answerUtils.js';
import { saveTestReport, clearTestReport } from '../utils/testReports.js';
import { useExamPersistence } from '../hooks/useExamPersistence.js';
import Header from './Header.jsx';
import QuestionPanel from './QuestionPanel.jsx';
import QuestionPalette from './QuestionPalette.jsx';
import ActionBar from './ActionBar.jsx';
import EvaluationSheet from './EvaluationSheet.jsx';

function getStatus(questionStatus, index) {
  return questionStatus[index] ?? 'Not Visited';
}

function setStatusAt(setQuestionStatus, index, status) {
  setQuestionStatus((prev) => ({ ...prev, [index]: status }));
}

export default function ExamScreen({ test, currentScreen, setCurrentScreen, onBackToDashboard }) {
  const questions = useMemo(() => test.questions ?? [], [test.questions]);

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
    timerStarted,
    setTimerStarted,
    isSubmitted,
    setIsSubmitted,
    resetExam,
  } = useExamPersistence(test.id, questions.length, test.durationSeconds);

  const [pendingAnswer, setPendingAnswer] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const examActive = timerStarted && !isSubmitted;
  const showEvaluation = currentScreen === 'evaluation' || isSubmitted;

  const savedAnswer = userAnswers[currentQuestionIndex];
  const answerValue =
    pendingAnswer !== null && pendingAnswer !== undefined
      ? pendingAnswer
      : savedAnswer !== undefined
        ? savedAnswer
        : isTextAnswerType(currentQuestion?.type)
          ? ''
          : null;

  const saveDisabled = !hasValidAnswer(currentQuestion, pendingAnswer ?? savedAnswer);

  const finishTest = useCallback(
    (finalAnswers) => {
      saveTestReport(test, finalAnswers);
      setIsSubmitted(true);
      setCurrentScreen('evaluation');
    },
    [test, setIsSubmitted, setCurrentScreen]
  );

  useEffect(() => {
    if (!hydrated) return;
    if (isSubmitted) {
      setCurrentScreen('evaluation');
    }
  }, [hydrated, isSubmitted, setCurrentScreen]);

  useEffect(() => {
    if (!hydrated) return;
    const stored = userAnswers[currentQuestionIndex];
    if (stored !== undefined) {
      setPendingAnswer(stored);
    } else {
      setPendingAnswer(
        isTextAnswerType(questions[currentQuestionIndex]?.type) ? '' : null
      );
    }
  }, [hydrated, currentQuestionIndex, userAnswers, questions]);

  useEffect(() => {
    if (!hydrated || !timerStarted || isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [hydrated, timerStarted, isSubmitted, timeLeft, setTimeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && hydrated && timerStarted && !isSubmitted) {
      finishTest(userAnswers);
    }
  }, [timeLeft, hydrated, timerStarted, isSubmitted, userAnswers, finishTest]);

  const handleStartTimer = () => {
    if (isSubmitted || timerStarted) return;
    setTimerStarted(true);
  };

  const handleResetTimer = () => {
    resetExam();
    clearTestReport(test.id);
    setPendingAnswer(null);
    setCurrentScreen('exam');
  };

  const handleStartNewAttempt = () => {
    resetExam();
    setPendingAnswer(null);
    setCurrentScreen('exam');
  };

  const handleBackToDashboard = () => {
    resetExam();
    setPendingAnswer(null);
    onBackToDashboard();
  };

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
      if (!examActive || nextIndex === currentQuestionIndex) return;
      markVisitedIfNeeded(currentQuestionIndex);
      setCurrentQuestionIndex(nextIndex);
      const stored = userAnswers[nextIndex];
      if (stored !== undefined) {
        setPendingAnswer(stored);
      } else {
        setPendingAnswer(isTextAnswerType(questions[nextIndex]?.type) ? '' : null);
      }
    },
    [
      examActive,
      currentQuestionIndex,
      markVisitedIfNeeded,
      setCurrentQuestionIndex,
      userAnswers,
      questions,
    ]
  );

  const goToNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, totalQuestions, goToQuestion]);

  const handleAnswerChange = (value) => {
    if (!examActive) return;
    setPendingAnswer(value);
    if (
      isTextAnswerType(currentQuestion?.type) &&
      typeof value === 'string' &&
      value.trim()
    ) {
      setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: value }));
    }
  };

  const handleMarkAndNext = () => {
    if (!examActive) return;
    setStatusAt(setQuestionStatus, currentQuestionIndex, 'Marked');
    if (hasValidAnswer(currentQuestion, pendingAnswer ?? savedAnswer)) {
      const toSave = pendingAnswer ?? savedAnswer;
      setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: toSave }));
    }
    goToNext();
  };

  const handleClearResponse = () => {
    if (!examActive) return;
    setPendingAnswer(isTextAnswerType(currentQuestion?.type) ? '' : null);
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestionIndex];
      return next;
    });
    setStatusAt(setQuestionStatus, currentQuestionIndex, 'Skipped');
  };

  const handleSaveAndNext = () => {
    if (!examActive) return;
    const toSave = pendingAnswer ?? savedAnswer;
    if (!hasValidAnswer(currentQuestion, toSave)) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: toSave }));
    setStatusAt(setQuestionStatus, currentQuestionIndex, 'Answered');
    goToNext();
  };

  const handleSubmit = () => {
    if (!examActive) return;
    markVisitedIfNeeded(currentQuestionIndex);
    let finalAnswers = { ...userAnswers };
    if (hasValidAnswer(currentQuestion, pendingAnswer ?? savedAnswer)) {
      const toSave = pendingAnswer ?? savedAnswer;
      finalAnswers = { ...finalAnswers, [currentQuestionIndex]: toSave };
      setUserAnswers(finalAnswers);
    }
    finishTest(finalAnswers);
  };

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
        <p>No questions found for {test.title}. Check markdown files.</p>
        <button type="button" className="btn btn-primary" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="exam-app">
      <Header
        testTitle={test.title}
        timeLeft={timeLeft}
        timerStarted={timerStarted}
        isSubmitted={showEvaluation}
        onStartTimer={handleStartTimer}
        onResetTimer={handleResetTimer}
        onBackToSelection={onBackToDashboard}
      />

      {showEvaluation ? (
        <EvaluationSheet
          testId={test.id}
          testTitle={test.title}
          onStartNewAttempt={handleStartNewAttempt}
          onBackToDashboard={handleBackToDashboard}
        />
      ) : (
        <>
          <main className={`exam-body ${!timerStarted ? 'exam-body--locked' : ''}`}>
            <div className="exam-main">
              {!timerStarted && (
                <div className="exam-lock-overlay" role="status">
                  <p className="exam-lock-title">Exam not started</p>
                  <p className="exam-lock-message">
                    Click <strong>Start Timer</strong> in the header to begin{' '}
                    <strong>{test.title}</strong> and unlock questions.
                  </p>
                </div>
              )}
              <QuestionPanel
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                sectionLabel={test.sectionLabel}
                answerValue={answerValue}
                onAnswerChange={handleAnswerChange}
                disabled={!timerStarted}
                contextMarkdown={test.contextMarkdown}
                chartSpec={test.chartSpec}
                passageText={test.passageText}
              />
            </div>
            <QuestionPalette
              totalQuestions={totalQuestions}
              sectionLabel={test.sectionLabel}
              currentQuestionIndex={currentQuestionIndex}
              questionStatus={questionStatus}
              onJumpTo={goToQuestion}
              onSubmit={handleSubmit}
              disabled={!timerStarted}
            />
          </main>

          <ActionBar
            onMarkAndNext={handleMarkAndNext}
            onClearResponse={handleClearResponse}
            onSaveAndNext={handleSaveAndNext}
            isLastQuestion={currentQuestionIndex === totalQuestions - 1}
            disabled={!timerStarted}
            saveDisabled={saveDisabled}
          />
        </>
      )}
    </div>
  );
}
