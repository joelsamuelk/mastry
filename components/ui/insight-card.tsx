import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

interface InsightCardProps {
  eyebrow: string;
  title: string;
  body: string;
  actions?: string[];
  className?: string;
}

export function InsightCard({
  eyebrow,
  title,
  body,
  actions = [],
  className,
}: InsightCardProps) {
  return (
    <SurfaceCard tone="soft" className={cn("relative overflow-hidden p-6 md:p-7", className)}>
      <div className="absolute inset-y-6 left-0 w-1 rounded-full bg-[var(--accent)]" />
      <div className="space-y-5 pl-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            <Lightbulb className="size-3.5" />
            {eyebrow}
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">
              {title}
            </h3>
            <p className="text-sm leading-7 text-[var(--ink-muted)] md:text-base">{body}</p>
          </div>
        </div>
        {actions.length ? (
          <div className="flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <Button key={action} variant={index === 0 ? "primary" : "ghost"} size="sm">
                {action}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </SurfaceCard>
  );
}
