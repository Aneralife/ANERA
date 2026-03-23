import { cn } from "@/lib/utils";

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export function DisplayLarge({ children, className }: TextProps) {
  return (
    <h1 className={cn("text-display-lg", className)}>
      {children}
    </h1>
  );
}

export function Display({ children, className }: TextProps) {
  return (
    <h1 className={cn("text-display", className)}>
      {children}
    </h1>
  );
}

export function DisplaySmall({ children, className }: TextProps) {
  return (
    <h2 className={cn("text-display-sm", className)}>
      {children}
    </h2>
  );
}

export function Headline({ children, className }: TextProps) {
  return (
    <h3 className={cn("text-headline", className)}>
      {children}
    </h3>
  );
}

export function Body({ children, className }: TextProps) {
  return (
    <p className={cn("text-body text-[#86868b]", className)}>
      {children}
    </p>
  );
}

export function BodyLarge({ children, className }: TextProps) {
  return (
    <p className={cn("text-body-lg text-[#86868b]", className)}>
      {children}
    </p>
  );
}

export function Caption({ children, className }: TextProps) {
  return (
    <span className={cn("text-caption text-[#86868b]", className)}>
      {children}
    </span>
  );
}

export function Overline({ children, className }: TextProps) {
  return (
    <span
      className={cn(
        "text-xs font-medium uppercase tracking-[0.1em] text-[#86868b]",
        className
      )}
    >
      {children}
    </span>
  );
}

// Keep backwards compat aliases
export const H1 = Display;
export const H2 = DisplaySmall;
export const H3 = Headline;
export const Paragraph = Body;
export const Label = Overline;
