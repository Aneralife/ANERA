#!/usr/bin/env python3
"""Convert PNG assets to high-quality WebP files.

By default this converts every PNG under public/, writes a sibling .webp file,
and removes the original PNG only after conversion succeeds.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image


@dataclass
class ConversionResult:
    source: Path
    target: Path
    original_size: int
    webp_size: int

    @property
    def saved_bytes(self) -> int:
        return self.original_size - self.webp_size


def iter_pngs(root: Path) -> Iterable[Path]:
    return sorted(
        path
        for path in root.rglob("*")
        if path.is_file() and path.suffix.lower() == ".png"
    )


def convert_one(path: Path, *, quality: int, delete_original: bool) -> ConversionResult:
    target = path.with_suffix(".webp")

    with Image.open(path) as image:
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        image.save(
            target,
            "WEBP",
            quality=quality,
            method=6,
            exact=True,
        )

    result = ConversionResult(
        source=path,
        target=target,
        original_size=path.stat().st_size,
        webp_size=target.stat().st_size,
    )

    if delete_original:
        path.unlink()

    return result


def format_size(num_bytes: int) -> str:
    for unit in ("B", "KB", "MB"):
        if abs(num_bytes) < 1024:
            return f"{num_bytes:.1f} {unit}"
        num_bytes /= 1024
    return f"{num_bytes:.1f} GB"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "root",
        nargs="?",
        default="public",
        type=Path,
        help="Directory to scan for PNG files. Defaults to public/.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=92,
        help="WebP quality from 1-100. Defaults to 92 for high visual fidelity.",
    )
    parser.add_argument(
        "--keep-originals",
        action="store_true",
        help="Keep PNG files after writing WebP versions.",
    )
    args = parser.parse_args()

    if not 1 <= args.quality <= 100:
        parser.error("--quality must be between 1 and 100")

    root = args.root.resolve()
    pngs = list(iter_pngs(root))

    if not pngs:
        print(f"No PNG files found under {root}")
        return 0

    results = [
        convert_one(path, quality=args.quality, delete_original=not args.keep_originals)
        for path in pngs
    ]

    original_total = sum(item.original_size for item in results)
    webp_total = sum(item.webp_size for item in results)
    saved_total = original_total - webp_total

    for item in results:
        pct = (item.saved_bytes / item.original_size) * 100 if item.original_size else 0
        print(
            f"{item.source.relative_to(root)} -> {item.target.relative_to(root)} "
            f"{format_size(item.original_size)} -> {format_size(item.webp_size)} "
            f"({pct:.1f}% saved)"
        )

    total_pct = (saved_total / original_total) * 100 if original_total else 0
    print()
    print(f"Converted {len(results)} PNG files")
    print(
        f"Total: {format_size(original_total)} -> {format_size(webp_total)} "
        f"({format_size(saved_total)} saved, {total_pct:.1f}%)"
    )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
