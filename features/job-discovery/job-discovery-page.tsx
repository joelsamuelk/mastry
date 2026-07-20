"use client";

import { useState } from "react";
import {
  Search,
  Globe,
  MapPin,
  Building2,
  Bookmark,
  ExternalLink,
  Sparkles,
  Loader2,
  Filter,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import type { JobSearchResult } from "@/types/domain";
import { toast } from "sonner";

export function JobDiscoveryPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<JobSearchResult[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) {
      toast.error("Enter a search query");
      return;
    }

    setSearching(true);
    setHasSearched(true);
    try {
      const res = await fetch("/api/jobs/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          filters: {
            location: location || undefined,
            remote_only: remoteOnly || undefined,
          },
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setResults(json.data.results ?? []);
        toast.success(`Found ${json.data.result_count} roles`);
      } else {
        toast.error(json.error);
      }
    } catch {
      toast.error("Search failed — please try again");
    }
    setSearching(false);
  }

  async function handleSave(job: JobSearchResult, index: number) {
    const key = `${job.company}-${job.title}-${index}`;
    try {
      const res = await fetch("/api/jobs/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job }),
      });

      const json = await res.json();
      if (res.ok) {
        setSavedIds((prev) => new Set(prev).add(key));
        toast.success(`Saved ${job.title} at ${job.company}`);
      } else {
        toast.error(json.error);
      }
    } catch {
      toast.error("Failed to save job");
    }
  }

  const sourceColors: Record<string, string> = {
    LinkedIn: "bg-blue-50 text-blue-700",
    Indeed: "bg-purple-50 text-purple-700",
    Glassdoor: "bg-green-50 text-green-700",
    "Google Jobs": "bg-red-50 text-red-700",
    AngelList: "bg-orange-50 text-orange-700",
    "Company Website": "bg-gray-100 text-gray-700",
    RemoteOK: "bg-teal-50 text-teal-700",
    WeWorkRemotely: "bg-indigo-50 text-indigo-700",
  };

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading
        eyebrow="Job Discovery"
        title="Find your perfect role"
        description="AI searches across LinkedIn, Indeed, Glassdoor, and more — matched to your profile and goals."
      />

      {/* Search bar */}
      <Card className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="e.g. Senior Product Manager, Staff Engineer, Head of Design..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={buttonStyles({ variant: "quiet", size: "sm" })}
          >
            <Filter className="h-4 w-4" />
          </button>
          <Button onClick={handleSearch} disabled={searching}>
            {searching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Discover roles
              </>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 flex gap-4 border-t border-[var(--surface-high)] pt-4">
            <Input
              placeholder="Location filter"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm text-[var(--ink-muted)] whitespace-nowrap">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              Remote only
            </label>
          </div>
        )}
      </Card>

      {/* Results */}
      {searching && (
        <div className="py-20 text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[var(--ink-muted)]" />
          <p className="text-sm text-[var(--ink-muted)]">
            Searching across job platforms...
          </p>
        </div>
      )}

      {!searching && results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--ink-muted)]">
            {results.length} roles found across multiple platforms
          </p>
          {results.map((job, i) => {
            const key = `${job.company}-${job.title}-${i}`;
            const isSaved = savedIds.has(key);

            return (
              <Card key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle>{job.title}</CardTitle>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${sourceColors[job.source] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {job.source}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {job.company}
                      </span>
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                      )}
                      {job.remote_type && (
                        <Badge variant="accent">{job.remote_type}</Badge>
                      )}
                    </div>
                    {job.salary_min && (
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {job.salary_currency || "GBP"}{" "}
                        {job.salary_min.toLocaleString()}
                        {job.salary_max &&
                          ` - ${job.salary_max.toLocaleString()}`}
                      </p>
                    )}
                    {job.description && (
                      <p className="mt-2 text-sm text-[var(--ink-muted)] line-clamp-2">
                        {job.description}
                      </p>
                    )}
                    {job.posted_date && (
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        Posted: {new Date(job.posted_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonStyles({
                          variant: "ghost",
                          size: "sm",
                        })}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleSave(job, i)}
                      disabled={isSaved}
                      className={buttonStyles({
                        variant: isSaved ? "quiet" : "primary",
                        size: "sm",
                      })}
                    >
                      <Bookmark className="h-4 w-4" />
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {!searching && hasSearched && results.length === 0 && (
        <Card className="py-16 text-center">
          <Search className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>No results found</CardTitle>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Try broadening your search or adjusting filters.
          </p>
        </Card>
      )}

      {!searching && !hasSearched && (
        <Card className="py-16 text-center">
          <Globe className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>Discover roles tailored to you</CardTitle>
          <p className="mt-2 max-w-md mx-auto text-sm text-[var(--ink-muted)]">
            Enter a search query and Mastry will find matching roles across
            LinkedIn, Indeed, Glassdoor, AngelList, and other job platforms —
            all matched to your Career Passport.
          </p>
        </Card>
      )}
    </div>
  );
}
