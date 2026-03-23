"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/shopify/types";

type VariantSelectorProps = {
  variants: ProductVariant[];
  defaultVariantId?: string;
};

export function VariantSelector({
  variants,
  defaultVariantId,
}: VariantSelectorProps) {
  const optionGroups = new Map<string, Set<string>>();

  for (const variant of variants) {
    for (const option of variant.selectedOptions) {
      if (!optionGroups.has(option.name)) {
        optionGroups.set(option.name, new Set());
      }
      optionGroups.get(option.name)!.add(option.value);
    }
  }

  const defaultVariant = variants.find((v) => v.id === defaultVariantId);

  return (
    <div className="space-y-6">
      {Array.from(optionGroups.entries()).map(([name, values]) => (
        <fieldset key={name}>
          <legend className="text-caption font-medium text-[#1d1d1f]">
            {name}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup">
            {Array.from(values).map((value) => {
              const isSelected = defaultVariant?.selectedOptions.some(
                (o) => o.name === name && o.value === value
              );

              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={cn(
                    "rounded-full px-5 py-2 text-caption font-medium transition-all duration-400 ease-apple",
                    isSelected
                      ? "bg-[#1d1d1f] text-white"
                      : "bg-transparent text-[#1d1d1f] ring-1 ring-inset ring-[#d2d2d7] hover:ring-[#86868b]"
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
