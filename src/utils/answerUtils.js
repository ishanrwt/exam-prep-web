/** @param {import('../parser.js').QuestionType} type */
export function isTextAnswerType(type) {
  return type === 'FUB' || type === 'CODE';
}

/**
 * @param {import('../parser.js').ExamQuestion} question
 * @param {number | string | undefined} userAnswer
 */
export function getUserAnswerDisplay(question, userAnswer) {
  if (userAnswer === undefined || userAnswer === null) return null;

  if (isTextAnswerType(question.type)) {
    return typeof userAnswer === 'string' ? userAnswer : null;
  }

  if (typeof userAnswer === 'number') {
    return question.options[userAnswer]?.text ?? null;
  }

  return null;
}

/** @param {import('../parser.js').ExamQuestion} question */
export function getCorrectAnswerDisplay(question) {
  if (question.type === 'MCQ' && question.correctAnswerIndex >= 0) {
    const letter = String.fromCharCode(65 + question.correctAnswerIndex);
    const text = question.options[question.correctAnswerIndex]?.text;
    return text ? `${letter}) ${text}` : question.correctAnswer;
  }
  return question.correctAnswer || '—';
}

/**
 * MCQ / FUB auto-graded; CODE is manual review only (always false).
 * @param {import('../parser.js').ExamQuestion} question
 * @param {number | string | undefined} userAnswer
 */
export function isAnswerCorrect(question, userAnswer) {
  if (question.type === 'CODE') return false;

  if (userAnswer === undefined || userAnswer === null) return false;

  if (question.type === 'FUB') {
    if (typeof userAnswer !== 'string') return false;
    return userAnswer.trim() === (question.correctAnswer ?? '').trim();
  }

  if (typeof userAnswer !== 'number') return false;
  return userAnswer === question.correctAnswerIndex;
}

/** @param {import('../parser.js').ExamQuestion} question */
export function isAutoGraded(question) {
  return question.type !== 'CODE';
}

/**
 * @param {import('../parser.js').ExamQuestion} question
 * @param {number | string | null} pending
 */
export function hasValidAnswer(question, pending) {
  if (pending === null || pending === undefined) return false;

  if (isTextAnswerType(question.type)) {
    return typeof pending === 'string' && pending.trim().length > 0;
  }

  return typeof pending === 'number';
}
