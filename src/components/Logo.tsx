import { Link } from "react-router-dom";

export function LogoMark({ size = 24, inverse = false }: { size?: number; inverse?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill={inverse ? "#f2f3f5" : "#0e0f12"} />
      <path d="M7 6h10v3H10v2.2h6v3h-6V18H7z" fill={inverse ? "#0e0f12" : "#ffffff"} />
      <rect x="14.6" y="15.6" width="2.4" height="2.4" rx="0.6" fill="#e8590c" />
    </svg>
  );
}

export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={`logo ${inverse ? "inverse" : ""}`} aria-label="Forge AI home">
      <LogoMark inverse={inverse} />
      <span className="logo-word">FORGE<span className="logo-ai">AI</span></span>
    </Link>
  );
}
