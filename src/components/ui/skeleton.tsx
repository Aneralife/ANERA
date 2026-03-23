import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl bg-[#f5f5f7]", className)}
      aria-hidden="true"
    />
  );
}
