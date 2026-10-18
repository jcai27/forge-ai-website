import { Link } from "react-router-dom";

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="forge-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB066" />
          <stop offset="1" stopColor="#FF5A1F" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="#17171A" stroke="rgba(255,255,255,0.1)" />
      <path d="M9 8h14v4H13v3h8v4h-8v5H9z" fill="url(#forge-g)" />
      <circle cx="23" cy="22" r="2.2" fill="#FFB066" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Forge AI home">
      <LogoMark />
      <span className="logo-word">FORGE<span className="logo-ai">AI</span></span>
    </Link>
  );
}
