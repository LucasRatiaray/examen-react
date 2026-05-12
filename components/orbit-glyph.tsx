export const OrbitGlyph = () => (
  <svg viewBox="0 0 120 120" className="h-16 w-16 shrink-0" aria-hidden>
    <circle
      cx="60"
      cy="60"
      r="46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeOpacity="0.7"
      style={{ strokeDasharray: "18 14" }}
      className="motion-safe:animate-[birdmachine-orbit_8.5s_linear_infinite] motion-reduce:animate-none"
    />
    <rect
      x="34"
      y="34"
      width="52"
      height="52"
      rx="14"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.7"
      className="motion-safe:animate-[birdmachine-grid_5.4s_ease-in-out_infinite] motion-reduce:animate-none"
    />
    <circle cx="60" cy="60" r="7" fill="currentColor" />
    <path
      d="M60 30v10M60 80v10M30 60h10M80 60h10"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeOpacity="0.7"
      className="motion-safe:animate-[birdmachine-pulse_6s_ease-in-out_infinite] motion-reduce:animate-none"
    />
  </svg>
);
