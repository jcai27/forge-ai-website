import { useMemo, useState, type MouseEvent } from "react";
import { TriangleAlert } from "lucide-react";

/* Sample data: daily order volume, 21 days actual + 7 days forecast. */
const DAYS = 28;
const ACTUAL = 21;
const weekly = [0, 8, 12, 10, 6, -38, -52];
const value = (d: number) => 168 + 2.1 * d + weekly[d % 7] - (d === 15 ? 46 : 0);
const band = (d: number) => 7 + 2.4 * (d - ACTUAL + 1);
const ANOMALY = 15;

const VW = 520;
const VH = 200;
const PAD = { l: 34, r: 10, t: 12, b: 24 };
const Y0 = 80;
const Y1 = 260;

const x = (d: number) => PAD.l + (d / (DAYS - 1)) * (VW - PAD.l - PAD.r);
const y = (v: number) => PAD.t + (1 - (v - Y0) / (Y1 - Y0)) * (VH - PAD.t - PAD.b);

/** Single-series line with a forecast band. Hover anywhere for a crosshair + tooltip. */
export default function AnalyticsChart() {
  const [hover, setHover] = useState<number | null>(null);

  const { actualPath, forecastPath, bandPath } = useMemo(() => {
    const pts = (from: number, to: number) =>
      Array.from({ length: to - from + 1 }, (_, i) => from + i).map((d) => `${x(d).toFixed(1)},${y(value(d)).toFixed(1)}`);
    const upper = Array.from({ length: DAYS - ACTUAL + 1 }, (_, i) => ACTUAL - 1 + i).map((d) => `${x(d)},${y(value(d) + (d < ACTUAL ? 0 : band(d)))}`);
    const lower = Array.from({ length: DAYS - ACTUAL + 1 }, (_, i) => DAYS - 1 - i).map((d) => `${x(d)},${y(value(d) - (d < ACTUAL ? 0 : band(d)))}`);
    return {
      actualPath: "M" + pts(0, ACTUAL - 1).join(" L"),
      forecastPath: "M" + pts(ACTUAL - 1, DAYS - 1).join(" L"),
      bandPath: "M" + [...upper, ...lower].join(" L") + " Z",
    };
  }, []);

  const onMove = (e: MouseEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * (VW - PAD.l - PAD.r);
    setHover(Math.max(0, Math.min(DAYS - 1, Math.round((px / (VW - PAD.l - PAD.r)) * (DAYS - 1)))));
  };

  const isForecast = hover !== null && hover >= ACTUAL;
  return (
    <div className="chart">
      <div className="chart-head">
        <span className="chart-title">Daily orders processed</span>
        <span className="chart-key"><i className="k-actual" />Actual<i className="k-forecast" />Forecast</span>
      </div>
      <div className="chart-plot">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="chart-svg">
          {[100, 150, 200, 250].map((g) => (
            <g key={g}>
              <line x1={PAD.l} x2={VW - PAD.r} y1={y(g)} y2={y(g)} className="chart-grid" />
              <text x={PAD.l - 8} y={y(g) + 3} className="chart-tick" textAnchor="end">{g}</text>
            </g>
          ))}
          {[0, 7, 14, 21].map((d, i) => (
            <text key={d} x={x(d)} y={VH - 6} className="chart-tick" textAnchor={i === 0 ? "start" : "middle"}>Wk {i + 1}</text>
          ))}
          <line x1={x(ACTUAL - 1)} x2={x(ACTUAL - 1)} y1={PAD.t} y2={VH - PAD.b} className="chart-today" />
          <path d={bandPath} className="chart-band" />
          <path d={actualPath} className="chart-line" />
          <path d={forecastPath} className="chart-line forecast" />
          <circle cx={x(ANOMALY)} cy={y(value(ANOMALY))} r="5" className="chart-anomaly" />
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={VH - PAD.b} className="chart-cross" />
              <circle cx={x(hover)} cy={y(value(hover))} r="4.5" className="chart-hover-dot" />
            </g>
          )}
          <rect
            x={PAD.l} y={0} width={VW - PAD.l - PAD.r} height={VH}
            fill="transparent" onMouseMove={onMove} onMouseLeave={() => setHover(null)}
          />
        </svg>
        <span className="chart-anomaly-label" style={{ left: `${(x(ANOMALY) / VW) * 100}%`, top: `${(y(value(ANOMALY)) / VH) * 100}%` }}>
          <TriangleAlert size={11} strokeWidth={2.4} /> Unusual dip
        </span>
        {hover !== null && (
          <div className={`chart-tip ${hover > DAYS * 0.66 ? "left" : ""}`} style={{ left: `${(x(hover) / VW) * 100}%`, top: `${(y(value(hover)) / VH) * 100}%` }}>
            <span className="chart-tip-k">Day {hover + 1}{isForecast ? " · forecast" : ""}</span>
            <span className="chart-tip-v">{Math.round(value(hover))}{isForecast ? ` ± ${Math.round(band(hover))}` : ""} orders</span>
          </div>
        )}
      </div>
    </div>
  );
}
