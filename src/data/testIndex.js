import quantRaw from './quant.md?raw';
import programmingRaw from './programming.md?raw';
import verbalRaw from './verbal.md?raw';
import codingRaw from './coding.md?raw';
import { parseSubjectMarkdown } from '../parser.js';

const SUBJECT_CONFIG = [
  {
    subjectId: 'quant',
    subjectName: 'Quant',
    sectionLabel: 'Quantitative Aptitude',
    description: 'Arithmetic, logic, data interpretation, and quantitative reasoning.',
    durationMinutes: 60,
    raw: quantRaw,
  },
  {
    subjectId: 'programming',
    subjectName: 'Programming',
    sectionLabel: 'Programming Logic',
    description: 'Coding fundamentals, output prediction, and problem solving.',
    durationMinutes: 45,
    raw: programmingRaw,
  },
  {
    subjectId: 'verbal',
    subjectName: 'Verbal',
    sectionLabel: 'Verbal Ability',
    description: 'Grammar, vocabulary, comprehension, and verbal reasoning.',
    durationMinutes: 30,
    raw: verbalRaw,
  },
  {
    subjectId: 'coding',
    subjectName: 'Coding',
    sectionLabel: 'Coding Practice',
    description: 'Paste your solutions after solving in your local IDE. Compare with optimal answers.',
    durationMinutes: 90,
    raw: codingRaw,
  },
];

function buildTestsForSubject({
  subjectId,
  subjectName,
  sectionLabel,
  description,
  durationMinutes,
  raw,
}) {
  return parseSubjectMarkdown(raw).map((parsedTest) => ({
    id: `${subjectId}-test-${parsedTest.testNumber}`,
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

/**
 * Flat list of all mock tests across quant, programming, and verbal.
 * @type {Array<{
 *   id: string,
 *   title: string,
 *   subjectId: string,
 *   subjectName: string,
 *   sectionLabel: string,
 *   description: string,
 *   durationMinutes: number,
 *   durationSeconds: number,
 *   questionCount: number,
 *   questions: import('../parser.js').ExamQuestion[]
 * }>}
 */
export const tests = SUBJECT_CONFIG.flatMap(buildTestsForSubject);

export function getTestById(testId) {
  return tests.find((t) => t.id === testId) ?? null;
}

export function getTestsBySubject(subjectId) {
  return tests.filter((t) => t.subjectId === subjectId);
}

/** Subject cards for the dashboard home screen */
export const subjects = SUBJECT_CONFIG.map((cfg) => {
  const subjectTests = getTestsBySubject(cfg.subjectId);
  return {
    subjectId: cfg.subjectId,
    subjectName: cfg.subjectName,
    sectionLabel: cfg.sectionLabel,
    description: cfg.description,
    durationMinutes: cfg.durationMinutes,
    testCount: subjectTests.length,
  };
});
