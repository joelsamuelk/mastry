"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Globe,
  Edit3,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonStyles } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type {
  CareerPassport,
  Employer,
  Education,
  Certification,
} from "@/types/domain";

interface PassportData {
  passport: CareerPassport | null;
  employers: Employer[];
  education: Education[];
  certifications: Certification[];
}

export function PassportView() {
  const [data, setData] = useState<PassportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: passport } = await supabase
        .from("career_passports")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!passport) {
        setData({ passport: null, employers: [], education: [], certifications: [] });
        setLoading(false);
        return;
      }

      const [employersRes, educationRes, certsRes] = await Promise.all([
        supabase
          .from("employers")
          .select("*")
          .eq("passport_id", passport.id)
          .order("start_date", { ascending: false }),
        supabase
          .from("education")
          .select("*")
          .eq("passport_id", passport.id)
          .order("end_year", { ascending: false }),
        supabase
          .from("certifications")
          .select("*")
          .eq("passport_id", passport.id),
      ]);

      setData({
        passport,
        employers: employersRes.data ?? [],
        education: educationRes.data ?? [],
        certifications: certsRes.data ?? [],
      });
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  if (!data?.passport?.career_summary) {
    return (
      <div className="mx-auto max-w-3xl text-center py-20">
        <SectionHeading
          eyebrow="Career Passport"
          title="Your passport is empty"
          description="Upload your CV to auto-generate your Career Passport, or build it manually."
          align="center"
        />
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/upload"
            className={buttonStyles({ variant: "primary" })}
          >
            Upload CV
          </Link>
          <Link
            href="/passport/edit"
            className={buttonStyles({ variant: "quiet" })}
          >
            Build manually
          </Link>
        </div>
      </div>
    );
  }

  const { passport, employers, education, certifications } = data;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 flex items-start justify-between">
        <SectionHeading
          eyebrow="Career Passport"
          title={passport.current_role_title || "Your Career"}
          description={passport.current_company ? `at ${passport.current_company}` : undefined}
          className="mb-0"
        />
        <Link
          href="/passport/edit"
          className={buttonStyles({ variant: "quiet", size: "sm" })}
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </Link>
      </div>

      {/* Summary */}
      {passport.career_summary && (
        <Card className="mb-6">
          <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
            {passport.career_summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
            {passport.years_experience && (
              <span>{passport.years_experience} years experience</span>
            )}
            {passport.seniority_level && (
              <Badge variant="accent">
                {passport.seniority_level.replace("_", " ")}
              </Badge>
            )}
          </div>
        </Card>
      )}

      {/* Skills */}
      {passport.skills.length > 0 && (
        <Card className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <Code className="h-4 w-4 text-[var(--accent)]" />
            <CardTitle>Skills</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            {passport.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Languages */}
      {passport.languages.length > 0 && (
        <Card className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-[var(--accent)]" />
            <CardTitle>Languages</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            {passport.languages.map((lang) => (
              <Badge key={lang} variant="accent">{lang}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Work experience */}
      {employers.length > 0 && (
        <Card className="mb-6">
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[var(--accent)]" />
            <CardTitle>Experience</CardTitle>
          </div>
          <div className="space-y-8">
            {employers.map((emp) => (
              <div key={emp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-[var(--ink)]">
                      {emp.role_title}
                    </h4>
                    <p className="text-sm text-[var(--ink-muted)]">
                      {emp.company_name}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--muted)] whitespace-nowrap">
                    {emp.start_date || "?"} - {emp.is_current ? "Present" : emp.end_date || "?"}
                  </span>
                </div>
                {emp.description && (
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">
                    {emp.description}
                  </p>
                )}
                {emp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {emp.achievements.map((ach, i) => (
                      <li key={i} className="text-sm text-[var(--ink-muted)] before:content-['•_'] before:text-[var(--accent)]">
                        {ach}
                      </li>
                    ))}
                  </ul>
                )}
                {emp.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {emp.technologies.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Card className="mb-6">
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[var(--accent)]" />
            <CardTitle>Education</CardTitle>
          </div>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <h4 className="font-semibold text-[var(--ink)]">
                  {edu.degree && `${edu.degree} in `}{edu.field_of_study || ""}
                </h4>
                <p className="text-sm text-[var(--ink-muted)]">
                  {edu.institution}
                </p>
                {(edu.start_year || edu.end_year) && (
                  <span className="text-xs text-[var(--muted)]">
                    {edu.start_year || "?"} - {edu.end_year || "?"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Card>
          <div className="mb-6 flex items-center gap-2">
            <Award className="h-4 w-4 text-[var(--accent)]" />
            <CardTitle>Certifications</CardTitle>
          </div>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--ink)]">
                    {cert.name}
                  </h4>
                  {cert.issuer && (
                    <p className="text-xs text-[var(--ink-muted)]">{cert.issuer}</p>
                  )}
                </div>
                {cert.date_obtained && (
                  <span className="text-xs text-[var(--muted)]">
                    {cert.date_obtained}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
