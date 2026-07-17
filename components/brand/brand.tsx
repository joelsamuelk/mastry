import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "wordmark";
  theme?: "dark" | "light";
}

const markSizes = { sm: 28, md: 36, lg: 52 };
const wordmarkSizes = { sm: 80, md: 110, lg: 160 };

export function Brand({ className, size = "md", variant = "mark", theme = "dark" }: BrandProps) {
  if (variant === "wordmark") {
    const w = wordmarkSizes[size];
    const src = theme === "dark" ? "/brand/2.png" : "/brand/3.png";
    return (
      <Image
        src={src}
        alt="Mastry"
        width={w}
        height={Math.round(w * 1.1)}
        className={cn("object-contain", className)}
        priority
      />
    );
  }

  const px = markSizes[size];
  const src = theme === "dark" ? "/brand/1.png" : "/brand/4.png";
  return (
    <Image
      src={src}
      alt="Mastry"
      width={px}
      height={px}
      className={cn("object-contain", className)}
      priority
    />
  );
}
