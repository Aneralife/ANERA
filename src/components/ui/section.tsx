import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "surface" | "dark";
  spacing?: "sm" | "md" | "lg" | "xl";
};

const spacingStyles = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-30 lg:py-40",
  xl: "py-24 sm:py-40 lg:py-52",
};

export function Section({
  children,
  className,
  theme = "light",
  spacing = "lg",
}: SectionProps) {
  return (
    <section
      className={cn(
        `section-${theme}`,
        spacingStyles[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}
