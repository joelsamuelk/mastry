import { cn } from "@/lib/utils";

interface MentorPortraitProps {
  initials: string;
  gradient: string;
  className?: string;
}

export function MentorPortrait({
  initials,
  gradient,
  className,
}: MentorPortraitProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] shadow-[0_12px_40px_rgba(45,51,56,0.12)]",
        className,
      )}
      style={{ backgroundImage: gradient }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent_0%,rgba(17,24,39,0.68)_100%)]" />
      <div className="absolute left-4 top-4 h-8 w-16 rounded-full bg-white/15 blur-md" />
      <div className="absolute bottom-4 left-4 text-4xl font-display font-bold tracking-[-0.08em] text-white">
        {initials}
      </div>
    </div>
  );
}
