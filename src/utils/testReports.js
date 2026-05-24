import {
  calculateScore,
  markTestCompleted,
  getAllCompletions,
} from './testCompletion.js';
import {
  getUserAnswerDisplay,
  getCorrectAnswerDisplay,
  isAnswerCorrect,
  isAutoGraded,
} from './answerUtils.js';

const REPORTS_STORAGE_KEY = 'tcs-nqt-mock-reports';

function loadReports() {
  try {
    const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveReports(data) {
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(data));
}

/**
 * @param {import('../parser.js').ExamQuestion[]} questions
 * @param {Record<number, number | string>} userAnswers
 */
export function buildReportItems(questions, userAnswers) {
  return questions.map((question, index) => {
    const userAnswer = userAnswers[index];
    const userAnswerText = getUserAnswerDisplay(question, userAnswer);
    const correctAnswerText = getCorrectAnswerDisplay(question);
    const isCode = question.type === 'CODE';
    const answered = userAnswer !== undefined && userAnswer !== null && userAnswerText !== null && userAnswerText !== '';
    const correct = isCode ? null : isAnswerCorrect(question, userAnswer);

    let status = 'unanswered';
    if (isCode && answered) status = 'review';
    else if (isCode && !answered) status = 'unanswered';
    else if (correct === true) status = 'correct';
    else if (answered) status = 'incorrect';

    return {
      questionId: question.id,
      questionText: question.text,
      type: question.type,
      userAnswerText: userAnswerText ?? null,
      correctAnswerText,
      explanation: question.explanation ?? '',
      isCorrect: correct,
      status,
      autoGraded: isAutoGraded(question),
    };
  });
}

/**
 * Save full report + completion summary when a test is submitted.
 * @param {object} test - test object from testIndex
 * @param {Record<number, number | string>} userAnswers
 */
export function saveTestReport(test, userAnswers) {
  const questions = test.questions ?? [];
  const { score, total, totalQuestions } = calculateScore(questions, userAnswers);
  const items = buildReportItems(questions, userAnswers);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const report = {
    testId: test.id,
    testTitle: test.title,
    sectionLabel: test.sectionLabel ?? '',
    subjectId: test.subjectId ?? '',
    completedAt: new Date().toISOString(),
    score,
    total,
    totalQuestions,
    percentage,
    items,
  };

  const reports = loadReports();
  reports[test.id] = report;
  saveReports(reports);

  markTestCompleted(test.id, { score, total, totalQuestions });

  return report;
}

export function getTestReport(testId) {
  return loadReports()[testId] ?? null;
}

/** @returns {Array<import('./testReports.js').TestReport>} */
export function getAllReports() {
  return Object.values(loadReports()).sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  );
}

export function hasAnyReports() {
  return Object.keys(loadReports()).length > 0;
}

export function clearTestReport(testId) {
  const reports = loadReports();
  delete reports[testId];
  saveReports(reports);
}

export { getAllCompletions };
