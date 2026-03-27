"use client";

type Props = {
  html: string;
};

export function ProductDescription({ html }: Props) {
  if (!html) return null;

  return (
    <div
      className="pdp-desc__body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
