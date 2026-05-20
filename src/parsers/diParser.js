const DATASET_SPLIT = /^#\s*DATASET\s+(\d+):\s*([^\n]+)/im;
const QUESTIONS_SECTION = /^##\s*DATASET\s+\d+:\s*QUESTIONS/im;

function parseTableRow(line) {
  return line
    .split('|')
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
}

function extractMarkdownTables(markdown) {
  const lines = markdown.split('\n');
  const tables = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('|') && lines[i + 1]?.includes('---')) {
      const headers = parseTableRow(lines[i]);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(parseTableRow(lines[i]));
        i += 1;
      }
      if (headers.length && rows.length) tables.push({ headers, rows });
    } else {
      i += 1;
    }
  }
  return tables;
}

function parsePercent(val) {
  const m = String(val).match(/([\d.]+)\s*%/);
  return m ? parseFloat(m[1]) : null;
}

function parseNumeric(val) {
  const cleaned = String(val).replace(/[$,]/g, '').trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** @param {string} title @param {Array<{ headers: string[], rows: string[][] }>} tables */
function buildChartSpec(title, tables) {
  const t = title.toLowerCase();
  const primary = tables[0];
  if (!primary?.rows?.length) return { type: 'none' };

  if (t.includes('pie') && primary.headers.some((h) => /share/i.test(h))) {
    const shareIdx = primary.headers.findIndex((h) => /share/i.test(h));
    const labelIdx = 0;
    return {
      type: 'pie',
      title: 'Market share (%)',
      labels: primary.rows.map((r) => r[labelIdx]),
      values: primary.rows.map((r) => parsePercent(r[shareIdx]) ?? 0),
    };
  }

  if (t.includes('line') || t.includes('productivity')) {
    const weekIdx = primary.headers.findIndex((h) => /week/i.test(h));
    const series = primary.headers.slice(1).map((name) => ({
      name,
      values: primary.rows.map((r) => parseNumeric(r[primary.headers.indexOf(name)]) ?? 0),
    }));
    return {
      type: 'line',
      title: 'Weekly productivity scores',
      labels: primary.rows.map((r) => r[weekIdx] || r[0]),
      series,
    };
  }

  if (t.includes('bar') || t.includes('market share')) {
    const yearCols = primary.headers.slice(1);
    return {
      type: 'bar',
      title: 'Market share by year (%)',
      labels: primary.rows.map((r) => r[0]),
      series: yearCols.map((col, ci) => ({
        name: col,
        values: primary.rows.map((r) => parsePercent(r[ci + 1]) ?? parseNumeric(r[ci + 1]) ?? 0),
      })),
    };
  }

  if (t.includes('operating cost') || t.includes('variance')) {
    const monthIdx = primary.headers.findIndex((h) => /month/i.test(h));
    const series = primary.headers.slice(1).map((name) => ({
      name,
      values: primary.rows.map((r) => parseNumeric(r[primary.headers.indexOf(name)]) ?? 0),
    }));
    return {
      type: 'bar',
      title: 'Monthly operating costs (thousands USD)',
      labels: primary.rows.map((r) => r[monthIdx] || r[0]),
      series,
    };
  }

  const labelIdx = 0;
  const quarterCols = primary.headers.slice(1);
  return {
    type: 'line',
    title: 'Revenue by quarter (millions USD)',
    labels: quarterCols,
    series: primary.rows.map((row) => ({
      name: row[labelIdx],
      values: quarterCols.map((_, ci) => parseNumeric(row[ci + 1]) ?? 0),
    })),
  };
}

function parseDiQuestionBlock(qId, fubTag, body) {
  const isFub = Boolean(fubTag);
  let text = '';
  const options = [];
  let correctAnswer = '';
  let explanation = '';

  const answerMatch = body.match(/\nAnswer:\s*\*\*([^*]+)\*\*/i) || body.match(/\nAnswer:\s*([^\n]+)/i);
  const correctMatch = body.match(/\*\*Correct Answer:\s*([A-D])\*\*/i);

  if (answerMatch) {
    correctAnswer = answerMatch[1].replace(/\s*\([^)]*\)\s*$/, '').trim();
  } else if (correctMatch) {
    correctAnswer = correctMatch[1].trim();
  }

  const hintMatch = body.match(/\*([^*]+)\*/);
  if (hintMatch && !correctMatch) explanation = hintMatch[1];

  const lines = body.split('\n');
  const optionStart = lines.findIndex((l) => /^[A-D]\)\s/.test(l.trim()));

  if (optionStart >= 0) {
    text = lines
      .slice(0, optionStart)
      .join('\n')
      .replace(/^\s+|\s+$/g, '')
      .trim();
    for (let i = optionStart; i < lines.length; i += 1) {
      const trimmed = lines[i].trim();
      const opt = trimmed.match(/^([A-D])\)\s*(.+)$/);
      if (opt) options.push({ text: opt[2].trim() });
      if (/^Answer:/i.test(trimmed) || /^\*\*Correct Answer:/i.test(trimmed)) break;
    }
  } else {
    const cut = body.split(/\nAnswer:|\n\*\*Correct Answer:/i)[0];
    text = cut.replace(/\*[^*]+\*/g, '').trim();
  }

  text = text.replace(/\n---\s*$/, '').trim();

  const type = isFub ? 'FUB' : 'MCQ';
  let correctAnswerIndex = -1;
  if (type === 'MCQ' && correctAnswer) {
    correctAnswerIndex = options.findIndex(
      (o, i) => String.fromCharCode(65 + i) === correctAnswer.toUpperCase()
    );
  }

  return {
    id: qId,
    text,
    type,
    options,
    correctAnswer,
    correctAnswerIndex,
    explanation,
  };
}

function parseDatasetQuestions(questionsSection) {
  const questions = [];
  const regex = /\*\*Q(\d+\.\d+)\s*(\[FUB\])?\s*:\s*/gi;
  const matches = [...questionsSection.matchAll(regex)];

  for (let i = 0; i < matches.length; i += 1) {
    const m = matches[i];
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : questionsSection.length;
    const block = questionsSection.slice(start, end);
    const q = parseDiQuestionBlock(`Q${m[1]}`, m[2], block);
    if (q.text) questions.push(q);
  }

  return questions;
}

/**
 * @param {string} markdown
 * @returns {Array<{
 *   id: string,
 *   testNumber: number,
 *   title: string,
 *   contextMarkdown: string,
 *   chartSpec: object,
 *   questions: import('../parser.js').ExamQuestion[]
 * }>}
 */
export function parseDiMarkdown(markdown) {
  if (!markdown) return [];

  const headerRegex = /^#\s*DATASET\s+(\d+):\s*([^\n]+)/gim;
  const matches = [...markdown.matchAll(headerRegex)];
  const datasets = [];

  for (let m = 0; m < matches.length; m += 1) {
    const testNumber = parseInt(matches[m][1], 10);
    const datasetTitle = matches[m][2].trim();
    const start = matches[m].index + matches[m][0].length;
    const end = m + 1 < matches.length ? matches[m + 1].index : markdown.length;
    let body = markdown.slice(start, end);

    if (/COMPREHENSIVE ANSWER KEY/i.test(body)) {
      body = body.split(/#\s*COMPREHENSIVE ANSWER KEY/i)[0];
    }

    const qSectionIdx = body.search(QUESTIONS_SECTION);
    if (qSectionIdx === -1) continue;

    const contextMarkdown = body.slice(0, qSectionIdx).trim();
    const questionsPart = body.slice(qSectionIdx);
    const questions = parseDatasetQuestions(questionsPart);
    if (!questions.length) continue;

    const tables = extractMarkdownTables(contextMarkdown);
    const chartSpec = buildChartSpec(datasetTitle, tables);

    datasets.push({
      id: `DI Dataset ${testNumber}`,
      testNumber,
      title: datasetTitle,
      contextMarkdown,
      chartSpec,
      questions,
    });
  }

  return datasets;
}
