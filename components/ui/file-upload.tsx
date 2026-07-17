"use client";

import { useCallback, useState, type DragEvent, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  maxSizeMB?: number;
  onFileSelect: (file: File) => void;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  accept = ".pdf,.doc,.docx,.txt",
  maxSizeMB = 10,
  onFileSelect,
  className,
  disabled,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      setError(null);
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File must be under ${maxSizeMB}MB`);
        return;
      }
      onFileSelect(file);
    },
    [maxSizeMB, onFileSelect],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSelect(file);
    },
    [validateAndSelect],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSelect(file);
    },
    [validateAndSelect],
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[2rem] bg-[var(--surface-low)] p-12 transition duration-200 ease-out",
          isDragging && "bg-[var(--surface-high)] ring-2 ring-[var(--ink)]",
          !isDragging && "hover:bg-[var(--surface-high)]",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_12px_40px_rgba(45,51,56,0.04)]">
          <Upload className="h-6 w-6 text-[var(--ink)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[var(--ink)]">
            Drop your CV here or click to browse
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            PDF, DOC, DOCX, or TXT up to {maxSizeMB}MB
          </p>
        </div>
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
      </label>
      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
}
