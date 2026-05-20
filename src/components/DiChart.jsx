const COLORS = ['#3755c3', '#1e40af', '#60a5fa', '#93c5fd', '#2d3449', '#54647a'];

function PieChart({ spec }) {
  const total = spec.values.reduce((a, b) => a + b, 0) || 1;
  let angle = 0;
  const slices = spec.values.map((val, i) => {
    const slice = (val / total) * 360;
    const start = angle;
    angle += slice;
    return { start, slice, color: COLORS[i % COLORS.length], label: spec.labels[i], val };
  });

  const toXY = (deg, r = 40) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)];
  };

  return (
    <div className="di-chart di-chart--pie">
      <h4 className="di-chart-title">{spec.title}</h4>
      <svg viewBox="0 0 100 100" className="di-chart-svg" role="img" aria-label={spec.title}>
        {slices.map((s, i) => {
          const [x1, y1] = toXY(s.start);
          const [x2, y2] = toXY(s.start + s.slice);
          const large = s.slice > 180 ? 1 : 0;
          const d = `M 50 50 L ${x1} ${y1} A 40 40 0 ${large} 1 ${x2} ${y2} Z`;
          return <path key={i} d={d} fill={s.color} stroke="#fff" strokeWidth="0.5" />;
        })}
      </svg>
      <ul className="di-chart-legend">
        {slices.map((s, i) => (
          <li key={i}>
            <span className="di-legend-swatch" style={{ background: s.color }} />
            {s.label}: {s.val}%
          </li>
        ))}
      </ul>
    </div>
  );
}

function LineChart({ spec }) {
  const allVals = spec.series.flatMap((s) => s.values);
  const max = Math.max(...allVals, 1);
  const min = Math.min(...allVals, 0);
  const range = max - min || 1;
  const w = 320;
  const h = 160;
  const pad = 24;

  const xStep = (w - pad * 2) / Math.max(spec.labels.length - 1, 1);
  const yScale = (v) => h - pad - ((v - min) / range) * (h - pad * 2);

  return (
    <div className="di-chart di-chart--line">
      <h4 className="di-chart-title">{spec.title}</h4>
      <svg viewBox={`0 0 ${w} ${h}`} className="di-chart-svg di-chart-svg--wide" role="img">
        {spec.series.map((s, si) => {
          const points = s.values
            .map((v, i) => `${pad + i * xStep},${yScale(v)}`)
            .join(' ');
          return (
            <g key={si}>
              <polyline
                fill="none"
                stroke={COLORS[si % COLORS.length]}
                strokeWidth="2"
                points={points}
              />
              {s.values.map((v, i) => (
                <circle
                  key={i}
                  cx={pad + i * xStep}
                  cy={yScale(v)}
                  r="3"
                  fill={COLORS[si % COLORS.length]}
                />
              ))}
            </g>
          );
        })}
      </svg>
      <ul className="di-chart-legend">
        {spec.series.map((s, i) => (
          <li key={i}>
            <span className="di-legend-swatch" style={{ background: COLORS[i % COLORS.length] }} />
            {s.name}
          </li>
        ))}
      </ul>
      <div className="di-chart-x-labels">
        {spec.labels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function BarChart({ spec }) {
  const allVals = spec.series.flatMap((s) => s.values);
  const max = Math.max(...allVals, 1);
  const w = 320;
  const h = 160;
  const pad = 28;
  const groupCount = spec.labels.length;
  const seriesCount = spec.series.length;
  const groupW = (w - pad * 2) / groupCount;
  const barW = Math.min(14, (groupW - 4) / seriesCount);

  return (
    <div className="di-chart di-chart--bar">
      <h4 className="di-chart-title">{spec.title}</h4>
      <svg viewBox={`0 0 ${w} ${h}`} className="di-chart-svg di-chart-svg--wide" role="img">
        {spec.labels.map((label, gi) =>
          spec.series.map((s, si) => {
            const v = s.values[gi] ?? 0;
            const barH = (v / max) * (h - pad * 2);
            const x = pad + gi * groupW + si * barW + 2;
            const y = h - pad - barH;
            return (
              <rect
                key={`${gi}-${si}`}
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill={COLORS[si % COLORS.length]}
                rx="2"
              />
            );
          })
        )}
      </svg>
      <ul className="di-chart-legend">
        {spec.series.map((s, i) => (
          <li key={i}>
            <span className="di-legend-swatch" style={{ background: COLORS[i % COLORS.length] }} />
            {s.name}
          </li>
        ))}
      </ul>
      <div className="di-chart-x-labels">
        {spec.labels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export default function DiChart({ chartSpec }) {
  if (!chartSpec || chartSpec.type === 'none') return null;

  if (chartSpec.type === 'pie') return <PieChart spec={chartSpec} />;
  if (chartSpec.type === 'line') return <LineChart spec={chartSpec} />;
  if (chartSpec.type === 'bar') return <BarChart spec={chartSpec} />;

  return null;
}
