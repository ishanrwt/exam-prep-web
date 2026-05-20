import { useEffect, useState } from 'react';

export const INITIAL_TIME_SECONDS = 3600;
const STORAGE_PREFIX = 'tcs-nqt-mock-exam';

function storageKey(testId) {
  return `${STORAGE_PREFIX}-${testId}`;
}

function createDefaultState(durationSeconds) {
  return {
    currentQuestionIndex: 0,
    userAnswers: {},
    questionStatus: {},
    timeLeft: durationSeconds,
    timerStarted: false,
    isSubmitted: false,
  };
}

function loadFromStorage(testId, durationSeconds) {
  try {
    const raw = localStorage.getItem(storageKey(testId));
    if (!raw) return createDefaultState(durationSeconds);
    const parsed = JSON.parse(raw);
    return {
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === 'number'
          ? parsed.currentQuestionIndex
          : 0,
      userAnswers:
        parsed.userAnswers && typeof parsed.userAnswers === 'object'
          ? parsed.userAnswers
          : {},
      questionStatus:
        parsed.questionStatus && typeof parsed.questionStatus === 'object'
          ? parsed.questionStatus
          : {},
      timeLeft:
        typeof parsed.timeLeft === 'number' ? parsed.timeLeft : durationSeconds,
      timerStarted: Boolean(parsed.timerStarted),
      isSubmitted: Boolean(parsed.isSubmitted),
    };
  } catch {
    return createDefaultState(durationSeconds);
  }
}

/**
 * Exam state scoped per test id (separate localStorage key per test).
 */
export function useExamPersistence(testId, questionCount, durationSeconds = INITIAL_TIME_SECONDS) {
  const [hydrated, setHydrated] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!testId) {
      setHydrated(false);
      return;
    }

    setHydrated(false);
    const saved = loadFromStorage(testId, durationSeconds);
    setCurrentQuestionIndex(
      Math.min(Math.max(0, saved.currentQuestionIndex), Math.max(0, questionCount - 1))
    );
    setUserAnswers(saved.userAnswers);
    setQuestionStatus(saved.questionStatus);
    setTimeLeft(saved.timeLeft);
    setTimerStarted(saved.timerStarted);
    setIsSubmitted(saved.isSubmitted);
    setHydrated(true);
  }, [testId, questionCount, durationSeconds]);

  useEffect(() => {
    if (!hydrated || !testId) return;
    localStorage.setItem(
      storageKey(testId),
      JSON.stringify({
        currentQuestionIndex,
        userAnswers,
        questionStatus,
        timeLeft,
        timerStarted,
        isSubmitted,
      })
    );
  }, [
    hydrated,
    testId,
    currentQuestionIndex,
    userAnswers,
    questionStatus,
    timeLeft,
    timerStarted,
    isSubmitted,
  ]);

  const resetExam = () => {
    if (!testId) return;
    localStorage.removeItem(storageKey(testId));
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuestionStatus({});
    setTimeLeft(durationSeconds);
    setTimerStarted(false);
    setIsSubmitted(false);
  };

  return {
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
  };
}
