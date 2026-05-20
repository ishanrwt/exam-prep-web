const TEST_DELIMITER = /^---\s*TEST\s+(\d+)\s*---\s*$/im;
const Q_HEADER = /^###\s+(Q\d+)\s*$/im;
const QUESTION_PREFIX = /^Question:\s*/i;
const OPTION_LINE = /^-\s+\[\s*\]\s+(.+)$/;
const FUB_LINE = /^-\s+\[FUB\]\s*$/i;
const CODE_LINE = /^-\s+\[CODE\]\s*$/im;
const ANSWER_LINE = /^Answer:\s*(.+)$/im;
const EXPLANATION_HEADER = /^Explanation:\s*/im;

/**
 * @typedef {'MCQ' | 'FUB' | 'CODE'} QuestionType
 */

/**
 * @typedef {Object} ExamQuestion
 * @property {string} id
 * @property {string} text
 * @property {QuestionType} type
 * @property {Array<{ text: string }>} options
 * @property {string} correctAnswer
 * @property {number} correctAnswerIndex
 * @property {string} explanation
 */

/**
 * @typedef {Object} ParsedTest
 * @property {string} id
 * @property {number} testNumber
 * @property {ExamQuestion[]} questions
 */

function trimSegmentFences(text) {
  let out = text.trim();
  if (out.startsWith('```')) {
    out = out.replace(/^```(?:markdown)?\s*\r?\n?/i, '');
    const lastFence = out.lastIndexOf('```');
    if (lastFence !== -1) {
      out = out.slice(0, lastFence).trimEnd();
    }
  }
  return out.trim();
}

/**
 * Strips leading "Question:" and returns full problem statement (multi-line preserved).
 * @param {string} raw
 */
function extractProblemText(raw) {
  return raw.replace(QUESTION_PREFIX, '').trim();
}

/**
 * @returns {{ text: string, options: Array<{ text: string }>, type: QuestionType }}
 */
function parseQuestionBody(body) {
  const codeMatch = body.match(CODE_LINE);
  if (codeMatch && codeMatch.index !== undefined) {
    const beforeCode = body.slice(0, codeMatch.index).trim();
    return {
      text: extractProblemText(beforeCode),
      options: [],
      type: 'CODE',
    };
  }

  const lines = body.split('\n');
  let text = '';
  const textLines = [];
  const options = [];
  let type = 'MCQ';
  let seenQuestionPrefix = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (CODE_LINE.test(trimmed)) {
      type = 'CODE';
      break;
    }
    if (FUB_LINE.test(trimmed)) {
      type = 'FUB';
      continue;
    }

    const optMatch = trimmed.match(OPTION_LINE);
    if (optMatch) {
      options.push({ text: optMatch[1].trim() });
      continue;
    }

    if (QUESTION_PREFIX.test(line) || QUESTION_PREFIX.test(trimmed)) {
      const content = trimmed.replace(QUESTION_PREFIX, '').trim();
      if (content) textLines.push(content);
      seenQuestionPrefix = true;
      continue;
    }

    if (options.length === 0 && type !== 'FUB') {
      textLines.push(line);
    }
  }

  if (type === 'CODE') {
    return {
      text: textLines.join('\n').trim(),
      options: [],
      type: 'CODE',
    };
  }

  text = textLines.join('\n').trim();
  if (!text && seenQuestionPrefix) {
    text = textLines.join('\n').trim();
  }

  if (type === 'MCQ' && !text && options.length > 0) {
    const firstLine = lines.find((l) => l.trim())?.trim() ?? '';
    text = firstLine.replace(QUESTION_PREFIX, '').trim();
  }

  return { text, options, type };
}

/**
 * Supports multi-line explanations (e.g. optimal Java/Python solutions in code fences).
 */
function parseAnswerBody(body) {
  let correctAnswer = '';
  let explanation = '';

  const explParts = body.split(EXPLANATION_HEADER);
  if (explParts.length > 1) {
    explanation = explParts.slice(1).join('Explanation:').trim();
    const beforeExpl = explParts[0].trim();
    const answerMatch = beforeExpl.match(/^Answer:\s*(.+)$/ims);
    if (answerMatch) {
      correctAnswer = answerMatch[1].trim();
    }
  } else {
    const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      const aMatch = line.match(ANSWER_LINE);
      if (aMatch) {
        correctAnswer = aMatch[1].trim();
        continue;
      }
    }
  }

  return { correctAnswer, explanation };
}

function findCorrectAnswerIndex(options, correctAnswer) {
  const normalized = correctAnswer.trim().toLowerCase();
  const index = options.findIndex((o) => o.text.trim().toLowerCase() === normalized);
  return index >= 0 ? index : -1;
}

function sortQuestionIds(ids) {
  return [...ids].sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB;
  });
}

function parseTestBlock(block) {
  const merged = new Map();

  const segments = block.split(Q_HEADER);
  for (let i = 1; i < segments.length; i += 2) {
    const qId = segments[i].trim().toUpperCase();
    const rawBody = segments[i + 1] ?? '';
    const body = trimSegmentFences(rawBody);
    if (!body) continue;

    const hasQuestion = /Question:\s*/i.test(body) || CODE_LINE.test(body);
    const isAnswerOnly =
      /Answer:\s*/i.test(body) && !/Question:\s*/i.test(body) && !CODE_LINE.test(body);

    const existing = merged.get(qId) ?? {
      id: qId,
      text: '',
      type: 'MCQ',
      options: [],
      correctAnswer: '',
      correctAnswerIndex: -1,
      explanation: '',
    };

    if (hasQuestion && !isAnswerOnly) {
      const { text, options, type } = parseQuestionBody(body);
      existing.text = text;
      existing.options = options;
      existing.type = type;
    }

    if (isAnswerOnly) {
      const { correctAnswer, explanation } = parseAnswerBody(body);
      existing.correctAnswer = correctAnswer;
      existing.explanation = explanation;
    }

    merged.set(qId, existing);
  }

  return sortQuestionIds([...merged.keys()])
    .map((qId) => {
      const q = merged.get(qId);
      const correctAnswerIndex =
        q.type === 'MCQ' ? findCorrectAnswerIndex(q.options, q.correctAnswer) : -1;
      return {
        id: q.id,
        text: q.text,
        type: q.type,
        options: q.options,
        correctAnswer: q.correctAnswer,
        correctAnswerIndex,
        explanation: q.explanation,
      };
    })
    .filter((q) => q.text);
}

export function parseSubjectMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') return [];

  const parts = markdown.split(TEST_DELIMITER);
  const tests = [];

  for (let i = 1; i < parts.length; i += 2) {
    const testNumber = parseInt(parts[i].trim(), 10);
    const block = parts[i + 1] ?? '';
    const questions = parseTestBlock(block);

    if (questions.length === 0) continue;

    tests.push({
      id: `Test ${testNumber}`,
      testNumber,
      questions,
    });
  }

  return tests;
}

/** @deprecated Use parseSubjectMarkdown */
export function parseExamData(questionsMarkdown, answersMarkdown) {
  const questions = parseTestBlock(questionsMarkdown);
  if (!answersMarkdown) return questions;

  const answerBlocks = new Map();
  const segments = answersMarkdown.split(Q_HEADER);
  for (let i = 1; i < segments.length; i += 2) {
    const qId = segments[i].trim().toUpperCase();
    const body = trimSegmentFences(segments[i + 1] ?? '');
    if (body && /Answer:\s*/i.test(body)) {
      answerBlocks.set(qId, parseAnswerBody(body));
    }
  }

  return questions.map((q) => {
    const ans = answerBlocks.get(q.id);
    if (!ans) return q;
    const correctAnswerIndex =
      q.type === 'MCQ' ? findCorrectAnswerIndex(q.options, ans.correctAnswer) : -1;
    return {
      ...q,
      correctAnswer: ans.correctAnswer,
      explanation: ans.explanation,
      correctAnswerIndex,
    };
  });
}
