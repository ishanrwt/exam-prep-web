const PASSAGE_SPLIT = /^#\s*PASSAGE\s+(\d+):\s*([^\n]+)/im;
const QUESTIONS_HEADER = /^##\s*PASSAGE\s+\d+\s*QUESTIONS/im;

function parseReadingQuestionBlock(qNum, body) {
  let text = '';
  const options = [];
  let correctAnswer = '';
  let explanation = '';

  const correctMatch = body.match(/\*\*Correct Answer:\s*([A-D])\*\*/i);
  if (correctMatch) correctAnswer = correctMatch[1].trim();

  const explMatch = body.match(/\*\(([^)]+)\)\*/);
  if (explMatch) explanation = explMatch[1].trim();

  const lines = body.split('\n');
  const optionStart = lines.findIndex((l) => /^[A-D]\)\s/.test(l.trim()));

  if (optionStart >= 0) {
    text = lines.slice(0, optionStart).join('\n').trim();
    for (let i = optionStart; i < lines.length; i += 1) {
      const trimmed = lines[i].trim();
      const opt = trimmed.match(/^([A-D])\)\s*(.+)$/);
      if (opt) options.push({ text: opt[2].trim() });
      if (/^\*\*Correct Answer:/i.test(trimmed)) break;
    }
  } else {
    text = body.split(/\*\*Correct Answer:/i)[0].replace(/\*[^*]+\*/g, '').trim();
  }

  const correctAnswerIndex = correctAnswer
    ? options.findIndex((_, i) => String.fromCharCode(65 + i) === correctAnswer.toUpperCase())
    : -1;

  return {
    id: `Q${qNum}`,
    text,
    type: 'MCQ',
    options,
    correctAnswer,
    correctAnswerIndex,
    explanation,
  };
}

function parsePassageQuestions(questionsSection, passageNum) {
  const questions = [];
  const regex = /\*\*(\d+)\.\s*/g;
  const matches = [...questionsSection.matchAll(regex)];

  for (let i = 0; i < matches.length; i += 1) {
    const m = matches[i];
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : questionsSection.length;
    const block = questionsSection.slice(start, end);
    const q = parseReadingQuestionBlock(m[1], block);
    q.id = `P${passageNum}-Q${m[1]}`;
    if (q.text) questions.push(q);
  }

  return questions;
}

/**
 * @param {string} markdown
 */
export function parseReadingMarkdown(markdown) {
  if (!markdown) return [];

  const headerRegex = /^#\s*PASSAGE\s+(\d+):\s*([^\n]+)/gim;
  const matches = [...markdown.matchAll(headerRegex)];
  const passages = [];

  for (let m = 0; m < matches.length; m += 1) {
    const passageNum = parseInt(matches[m][1], 10);
    const passageTitle = matches[m][2].trim();
    const start = matches[m].index + matches[m][0].length;
    const end = m + 1 < matches.length ? matches[m + 1].index : markdown.length;
    let body = markdown.slice(start, end);

    if (/^#\s*PASSAGE\s+\d+\s*QUESTION\s*DISTRIBUTION/i.test(body)) {
      body = body.split(/^#\s*PASSAGE\s+\d+\s*QUESTION\s*DISTRIBUTION/im)[0];
    }

    const qIdx = body.search(QUESTIONS_HEADER);
    if (qIdx === -1) continue;

    const passageText = body.slice(0, qIdx).trim();
    const questions = parsePassageQuestions(body.slice(qIdx), passageNum);
    if (!questions.length || !passageText) continue;

    passages.push({
      id: `Reading Passage ${passageNum}`,
      testNumber: passageNum,
      title: passageTitle,
      passageText,
      questions,
    });
  }

  return passages;
}
