"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Image as ImageType } from "@/lib/shopify/types";

type ProductImageGalleryProps = {
  images: ImageType[];
  title: string;
};

export function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-[#f5f5f7] text-[#d2d2d7]">
        <svg
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="0.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#f5f5f7]">
        <Image
          src={images[selectedIndex].url}
          alt={images[selectedIndex].altText || `${title} - Image ${selectedIndex + 1}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-opacity duration-600 ease-apple"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="flex justify-center gap-2"
          role="tablist"
          aria-label="Product images"
        >
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`View image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-400 ease-apple",
                index === selectedIndex
                  ? "ring-2 ring-[#0071e3] ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image.url}
                alt={image.altText || `${title} thumbnail ${index + 1}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
