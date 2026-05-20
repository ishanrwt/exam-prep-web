import { isAnswerCorrect, isAutoGraded } from './answerUtils.js';

const COMPLETION_STORAGE_KEY = 'tcs-nqt-mock-completions';

function loadAll() {
  try {
    const raw = localStorage.getItem(COMPLETION_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(COMPLETION_STORAGE_KEY, JSON.stringify(data));
}

/**
 * @param {import('../parser.js').ExamQuestion[]} questions
 * @param {Record<number, number | string>} userAnswers
 */
export function calculateScore(questions, userAnswers) {
  const gradable = questions.filter(isAutoGraded);
  let score = 0;
  gradable.forEach((question) => {
    const index = questions.indexOf(question);
    if (isAnswerCorrect(question, userAnswers[index])) score += 1;
  });
  return { score, total: gradable.length, totalQuestions: questions.length };
}

export function markTestCompleted(testId, { score, total, totalQuestions }) {
  const data = loadAll();
  data[testId] = {
    completed: true,
    completedAt: new Date().toISOString(),
    score,
    total,
    totalQuestions: totalQuestions ?? total,
  };
  saveAll(data);
}

export function getTestCompletion(testId) {
  return loadAll()[testId] ?? null;
}

export function isTestCompleted(testId) {
  return Boolean(getTestCompletion(testId)?.completed);
}

export function getAllCompletions() {
  return loadAll();
}

export function clearTestCompletion(testId) {
  const data = loadAll();
  delete data[testId];
  saveAll(data);
}
