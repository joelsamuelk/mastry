import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "wordmark";
  theme?: "dark" | "light";
}

const markSizes = { sm: 24, md: 32, lg: 44 };
const wordmarkSizes = { sm: 80, md: 100, lg: 140 };
const wordmarkHeights = { sm: 28, md: 36, lg: 48 };

export function Brand({ className, size = "md", variant = "mark", theme = "dark" }: BrandProps) {
  const isLight = theme === "light";

  if (variant === "wordmark") {
    const src = isLight ? "/brand/4.png" : "/brand/2.png";
    return (
      <Image
        src={src}
        alt="Mastry"
        width={wordmarkSizes[size]}
        height={wordmarkHeights[size]}
        className={cn("object-contain", className)}
        priority
      />
    );
  }

  const px = markSizes[size];
  const src = isLight ? "/brand/3.png" : "/brand/1.png";
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
