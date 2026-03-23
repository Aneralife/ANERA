"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-scale" | "stagger";
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("is-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const animClass = {
    "fade-up": "animate-on-scroll",
    "fade-scale": "animate-on-scroll-scale",
    stagger: "stagger-children",
  }[variant];

  return (
    <div
      ref={ref}
      className={cn(animClass, className)}
    >
      {children}
    </div>
  );
}
