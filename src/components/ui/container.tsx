import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
  size?: "sm" | "md" | "lg" | "full";
};

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  as: Component = "div",
  size = "lg",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
