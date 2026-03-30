interface ProgressRingProps {
  value: number;
  label: string;
}

export function ProgressRing({ value, label }: ProgressRingProps) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative grid size-24 place-items-center">
        <svg className="size-24 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--surface-high)"
            strokeWidth="2"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <div className="font-display text-xl font-bold tracking-[-0.05em] text-[var(--ink)]">
            {value}%
          </div>
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Mastery
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold text-[var(--ink)]">{label}</p>
    </div>
  );
}
