import quantRaw from './quant.md?raw';
import diRaw from '../tests/quant/DI.md?raw';
import programmingRaw from './programming.md?raw';
import verbalRaw from './verbal.md?raw';
import readingRaw from '../tests/verbal/reading.md?raw';
import codingRaw from './coding.md?raw';
import { parseSubjectMarkdown } from '../parser.js';
import { parseDiMarkdown } from '../parsers/diParser.js';
import { parseReadingMarkdown } from '../parsers/readingParser.js';

function buildStandardTests({ subjectId, subjectName, sectionLabel, description, durationMinutes, raw, idPrefix = '' }) {
  return parseSubjectMarkdown(raw).map((parsedTest) => ({
    id: `${subjectId}${idPrefix}-test-${parsedTest.testNumber}`,
    title: `${subjectName} - ${parsedTest.id}`,
    subjectId,
    subjectName,
    sectionLabel,
    description,
    durationMinutes,
    durationSeconds: durationMinutes * 60,
    questionCount: parsedTest.questions.length,
    questions: parsedTest.questions,
  }));
}

function buildDiTests({ subjectId, subjectName, durationMinutes, raw }) {
  return parseDiMarkdown(raw).map((dataset) => ({
    id: `${subjectId}-di-${dataset.testNumber}`,
    title: `${subjectName} - ${dataset.id}`,
    subjectId,
    subjectName,
    sectionLabel: 'Data Interpretation',
    description: dataset.title,
    durationMinutes,
    durationSeconds: durationMinutes * 60,
    questionCount: dataset.questions.length,
    questions: dataset.questions,
    contextMarkdown: dataset.contextMarkdown,
    chartSpec: dataset.chartSpec,
  }));
}

function buildReadingTests({ subjectId, subjectName, durationMinutes, raw }) {
  return parseReadingMarkdown(raw).map((passage) => ({
    id: `${subjectId}-reading-${passage.testNumber}`,
    title: `${subjectName} - Passage ${passage.testNumber}`,
    subjectId,
    subjectName,
    sectionLabel: 'Reading Comprehension',
    description: passage.title,
    durationMinutes,
    durationSeconds: durationMinutes * 60,
    questionCount: passage.questions.length,
    questions: passage.questions,
    passageText: passage.passageText,
  }));
}

const QUANT_TESTS = [
  ...buildStandardTests({
    subjectId: 'quant',
    subjectName: 'Quant',
    sectionLabel: 'Quantitative Aptitude',
    description: 'Core quant practice sets.',
    durationMinutes: 60,
    raw: quantRaw,
  }),
  ...buildDiTests({
    subjectId: 'quant',
    subjectName: 'Quant',
    durationMinutes: 45,
    raw: diRaw,
  }),
];

const VERBAL_TESTS = [
  ...buildStandardTests({
    subjectId: 'verbal',
    subjectName: 'Verbal',
    sectionLabel: 'Verbal Ability',
    description: 'Grammar, vocabulary, and verbal reasoning.',
    durationMinutes: 30,
    raw: verbalRaw,
  }),
  ...buildReadingTests({
    subjectId: 'verbal',
    subjectName: 'Verbal',
    durationMinutes: 35,
    raw: readingRaw,
  }),
];

const PROGRAMMING_TESTS = buildStandardTests({
  subjectId: 'programming',
  subjectName: 'Programming',
  sectionLabel: 'Programming Logic',
  description: 'Coding fundamentals and problem solving.',
  durationMinutes: 45,
  raw: programmingRaw,
});

const CODING_TESTS = buildStandardTests({
  subjectId: 'coding',
  subjectName: 'Coding',
  sectionLabel: 'Coding Practice',
  description: 'Paste solutions and compare with optimal answers.',
  durationMinutes: 90,
  raw: codingRaw,
  idPrefix: '',
});

/** @type {import('../parser.js').ExamQuestion[]} */
export const tests = [
  ...QUANT_TESTS,
  ...PROGRAMMING_TESTS,
  ...VERBAL_TESTS,
  ...CODING_TESTS,
];

export function getTestById(testId) {
  return tests.find((t) => t.id === testId) ?? null;
}

export function getTestsBySubject(subjectId) {
  return tests.filter((t) => t.subjectId === subjectId);
}

export const subjects = [
  {
    subjectId: 'quant',
    subjectName: 'Quant',
    sectionLabel: 'Quantitative Aptitude & DI',
    description: 'Quant sets plus data interpretation with charts and tables.',
    durationMinutes: 60,
    testCount: getTestsBySubject('quant').length,
  },
  {
    subjectId: 'programming',
    subjectName: 'Programming',
    sectionLabel: 'Programming Logic',
    description: 'Coding fundamentals, output prediction, and problem solving.',
    durationMinutes: 45,
    testCount: getTestsBySubject('programming').length,
  },
  {
    subjectId: 'verbal',
    subjectName: 'Verbal',
    sectionLabel: 'Verbal & Reading',
    description: 'Verbal ability and reading comprehension passages.',
    durationMinutes: 35,
    testCount: getTestsBySubject('verbal').length,
  },
  {
    subjectId: 'coding',
    subjectName: 'Coding',
    sectionLabel: 'Coding Practice',
    description: 'Paste your solutions after solving in your local IDE.',
    durationMinutes: 90,
    testCount: getTestsBySubject('coding').length,
  },
];
