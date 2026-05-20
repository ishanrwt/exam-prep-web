/** Renders DI passage context: headings, paragraphs, and markdown tables. */
export default function MarkdownContext({ markdown }) {
  if (!markdown) return null;

  const blocks = [];
  const lines = markdown.split('\n');
  let i = 0;
  let tableBuffer = [];

  const flushTable = () => {
    if (tableBuffer.length < 2) {
      tableBuffer = [];
      return;
    }
    const headers = parseRow(tableBuffer[0]);
    const rows = tableBuffer.slice(2).map(parseRow).filter((r) => r.length);
    if (headers.length && rows.length) {
      blocks.push({ type: 'table', headers, rows });
    }
    tableBuffer = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      tableBuffer.push(trimmed);
      i += 1;
      continue;
    }

    flushTable();

    if (!trimmed) {
      i += 1;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.replace(/^##\s+/, '') });
    } else if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.replace(/^#\s+/, '') });
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      blocks.push({ type: 'bold', text: trimmed.slice(2, -2) });
    } else {
      blocks.push({ type: 'p', text: trimmed });
    }
    i += 1;
  }
  flushTable();

  return (
    <div className="markdown-context">
      {blocks.map((block, idx) => {
        if (block.type === 'h1') return <h3 key={idx} className="ctx-h1">{block.text}</h3>;
        if (block.type === 'h2') return <h4 key={idx} className="ctx-h2">{block.text}</h4>;
        if (block.type === 'bold') return <p key={idx} className="ctx-bold">{block.text}</p>;
        if (block.type === 'p') return <p key={idx} className="ctx-p">{block.text}</p>;
        if (block.type === 'table') {
          return (
            <div key={idx} className="ctx-table-wrap">
              <table className="ctx-table">
                <thead>
                  <tr>
                    {block.headers.map((h, hi) => (
                      <th key={hi}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function parseRow(line) {
  return line
    .split('|')
    .map((c) => c.trim())
    .filter(Boolean);
}
