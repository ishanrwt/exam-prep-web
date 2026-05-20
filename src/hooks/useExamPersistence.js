import { useEffect, useState } from 'react';

const STORAGE_KEY = 'tcs-nqt-mock-exam';

const DEFAULT_STATE = {
  currentQuestionIndex: 0,
  userAnswers: {},
  questionStatus: {},
  timeLeft: 3600,
};

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return {
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === 'number'
          ? parsed.currentQuestionIndex
          : DEFAULT_STATE.currentQuestionIndex,
      userAnswers:
        parsed.userAnswers && typeof parsed.userAnswers === 'object'
          ? parsed.userAnswers
          : DEFAULT_STATE.userAnswers,
      questionStatus:
        parsed.questionStatus && typeof parsed.questionStatus === 'object'
          ? parsed.questionStatus
          : DEFAULT_STATE.questionStatus,
      timeLeft:
        typeof parsed.timeLeft === 'number' ? parsed.timeLeft : DEFAULT_STATE.timeLeft,
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function useExamPersistence(questionCount) {
  const [hydrated, setHydrated] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const saved = loadFromStorage();
    setCurrentQuestionIndex(
      Math.min(Math.max(0, saved.currentQuestionIndex), Math.max(0, questionCount - 1))
    );
    setUserAnswers(saved.userAnswers);
    setQuestionStatus(saved.questionStatus);
    setTimeLeft(saved.timeLeft);
    setHydrated(true);
  }, [questionCount]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentQuestionIndex,
        userAnswers,
        questionStatus,
        timeLeft,
      })
    );
  }, [hydrated, currentQuestionIndex, userAnswers, questionStatus, timeLeft]);

  const resetExam = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuestionStatus({});
    setTimeLeft(3600);
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
    resetExam,
  };
}
