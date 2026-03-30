import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { MentorPortrait } from "@/components/ui/mentor-portrait";
import { Pill } from "@/components/ui/pill";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import type { Mentor } from "@/types/domain";

interface MentorCardProps {
  mentor: Mentor;
  className?: string;
}

export function MentorCard({ mentor, className }: MentorCardProps) {
  return (
    <SurfaceCard className={cn("flex h-full flex-col gap-5 p-5 md:p-6", className)}>
      <MentorPortrait
        initials={mentor.initials}
        gradient={mentor.avatarGradient}
        className="aspect-[5/6] w-full"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {mentor.focusAreas.slice(0, 2).map((focus) => (
              <Pill key={focus.id}>{focus.label}</Pill>
            ))}
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
              {mentor.name}
            </h3>
            <p className="text-sm text-[var(--ink-muted)]">
              {mentor.headline} at {mentor.company}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-[var(--ink-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-4 fill-[var(--accent)] text-[var(--accent)]" />
            {mentor.rating.toFixed(1)}
          </span>
          <span>${mentor.hourlyRateUsd}/hr</span>
        </div>
        <Link href={`/mentors/${mentor.slug}`} className={buttonStyles({ variant: "primary" })}>
          View Profile
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </SurfaceCard>
  );
}
