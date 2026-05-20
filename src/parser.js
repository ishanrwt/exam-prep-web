const QUESTION_HEADER = /^###\s+Q:\s*/m;
const OPTION_LINE = /^-\s+\[([ xX])\]\s+(.+)$/;

/**
 * Parses exam questions from Markdown.
 * @param {string} markdown - Raw markdown string from questions.md
 * @returns {Array<{ id: number, text: string, options: Array<{ text: string, isCorrect: boolean }>, correctAnswerIndex: number }>}
 */
export function parseQuestions(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return [];
  }

  const blocks = markdown
    .split(QUESTION_HEADER)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    const text = lines[0] ?? '';
    const options = [];
    let correctAnswerIndex = -1;

    for (let i = 1; i < lines.length; i += 1) {
      const match = lines[i].match(OPTION_LINE);
      if (!match) continue;

      const isCorrect = match[1].toLowerCase() === 'x';
      const optionText = match[2].trim();

      if (isCorrect) {
        correctAnswerIndex = options.length;
      }

      options.push({ text: optionText, isCorrect });
    }

    return {
      id: blockIndex + 1,
      text,
      options,
      correctAnswerIndex,
    };
  });
}
