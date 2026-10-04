export type ChatPart =
  | { type: "text"; value: string }
  | { type: "bold"; parts: ChatPart[] }
  | { type: "link"; label: string; href: string };

const SITE_ORIGIN = "https://www.aneralife.com";

/** Short labels for Anera paths. Path-like markdown labels use these. */
const PAGE_LABELS: Record<string, string> = {
  "/from-pain-to-purpose-anera-nmn-story": "Read the full story",
  "/the-complete-guide-to-nmn-supplements-in-canada": "The complete guide to NMN in Canada",
  "/what-should-you-look-for-in-a-high-quality-nmn-supplement": "What to look for in an NMN supplement",
  "/is-nmn-good-for-beginners-complete-guide": "Is NMN good for beginners?",
  "/nmn-vs-nad-whats-the-difference-and-which-is-better": "NMN vs NAD",
  "/food-vs-supplement-can-you-get-enough-nmn-naturally": "Food vs supplement",
  "/nmn-supplement-benefits-side-effects-dosage-guide": "NMN benefits, side effects, and dosage",
  "/why-i-stopped-taking-nmn": "Why I stopped taking NMN",
  "/nmn-supplement-for-dogs-and-cats": "NMN for dogs and cats",
  "/best-nmn-supplement-canada": "Best NMN supplement in Canada",
  "/how-to-choose-the-best-nmn-supplement-the-ultimate-buyers-guide": "How to choose an NMN supplement",
  "/where-to-buy-nmn-canada": "Where to buy NMN in Canada",
  "/how-long-does-nmn-take-to-work-day-1-to-6-months": "How long NMN takes to work",
  "/how-long-does-nmn-take-to-work": "How long NMN takes to work",
  "/when-nmn-works-best-for-your-body-clock": "When NMN works best",
  "/top-nmn-brands-canada": "Top NMN brands in Canada",
  "/products": "Shop Anera",
  "/products/nad-booster-nmn-15000": "NMN 15000",
  "/products/nmn-trans-resveratrol-24000": "NMN + TR 24000",
  "/shipping": "Shipping policy",
  "/returns": "Returns policy",
};

const MARKDOWN_LINK =
  /\[([^\[\]]{1,300})\][ \t]*\([ \t]*([^)\s]+)[ \t]*\)/g;

const BOLD = /\*\*([^*\n]{1,300})\*\*/g;

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

/** Array of matches. for-of on matchAll() fails this repo's TypeScript target. */
function collectMatches(text: string, pattern: RegExp): RegExpExecArray[] {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  const regex = new RegExp(pattern.source, flags);
  const found: RegExpExecArray[] = [];
  let match = regex.exec(text);
  while (match) {
    found.push(match);
    if (match[0].length === 0) regex.lastIndex += 1;
    match = regex.exec(text);
  }
  return found;
}

const BARE_URL = /https?:\/\/[^\s<>\]]+/g;

const BARE_PATH =
  /(^|[\s(])(\/(?:[a-z0-9]+(?:-[a-z0-9]+)*)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)(?=$|[\s).,;:!?])/gi;

/** Em dashes, en dashes, and spaced hyphens used as dashes become commas. */
export function softenDashes(text: string): string {
  return text
    .replace(/[ \t]*[—–][ \t]*/g, ", ")
    .replace(/[ \t]+-[ \t]+/g, ", ")
    .replace(/,[ \t]*,+/g, ",")
    .replace(/[ \t]{2,}/g, " ");
}

function pathnameOf(href: string): string {
  try {
    const path = new URL(href).pathname.replace(/\/$/, "");
    return path || "/";
  } catch {
    return "";
  }
}

function isEmailAddress(value: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
}

function mailtoHref(address: string): string {
  return `mailto:${address}`;
}

export function normalizeChatHref(raw: string): string | null {
  const value = raw.trim();
  if (!value || value.startsWith("//")) return null;

  if (/^mailto:/i.test(value)) {
    const address = value.slice(7).split("?")[0];
    return isEmailAddress(address) ? mailtoHref(address) : null;
  }

  if (value.startsWith("/")) {
    if (!/^\/[A-Za-z0-9/_~.-]*$/.test(value)) return null;
    const path = value.length > 1 ? value.replace(/\/$/, "") : value;
    return SITE_ORIGIN + path;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (url.username || url.password) return null;

  const host = url.hostname.toLowerCase();
  if (host === "aneralife.com" || host === "www.aneralife.com") {
    const path = url.pathname.length > 1 ? url.pathname.replace(/\/$/, "") : url.pathname;
    return SITE_ORIGIN + path + url.search + url.hash;
  }

  return url.toString();
}

function isAneraHref(href: string): boolean {
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === "aneralife.com" || host === "www.aneralife.com";
  } catch {
    return false;
  }
}

function looksLikeUrlOrPath(label: string, pathname: string): boolean {
  const value = label.trim();
  if (!value) return true;
  if (/^https?:\/\//i.test(value) || /^www\./i.test(value) || value.startsWith("/")) return true;
  if (/aneralife\.com/i.test(value)) return true;
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  if (slug && value.toLowerCase() === slug.toLowerCase()) return true;
  if (pathname && (value === pathname || value === pathname.slice(1))) return true;
  const hyphens = value.match(/-/g)?.length ?? 0;
  return !/\s/.test(value) && hyphens >= 2;
}

function labelFor(label: string, href: string): string {
  const clean = label.trim().replace(/\*\*/g, "").replace(/\s+/g, " ");
  if (href.startsWith("mailto:")) {
    const address = href.slice(7);
    return isEmailAddress(clean) ? clean : address;
  }
  const pathname = pathnameOf(href);
  const known = PAGE_LABELS[pathname];
  if (looksLikeUrlOrPath(clean, pathname)) {
    if (known) return known;
    if (isAneraHref(href)) return "Read the full story";
    try {
      return new URL(href).hostname.replace(/^www\./, "");
    } catch {
      return "Open link";
    }
  }
  return clean;
}

function stripIncompleteLink(text: string): string {
  const open = text.lastIndexOf("[");
  if (open === -1) return text;
  const tail = text.slice(open);
  if (/^\[[^\[\]]{0,300}\][ \t]*\([ \t]*(?:https?:\/\/|\/)[^)\s]+[ \t]*\)/.test(tail)) {
    return text;
  }
  const inProgress =
    /^\[[^\[\]]*$/.test(tail) ||
    /^\[[^\[\]]{0,300}\][ \t]*\([^)]*$/.test(tail);
  return inProgress ? text.slice(0, open) : text;
}

function trimTrailingPunctuation(url: string): { url: string; rest: string } {
  const match = url.match(/^(.*?)([.,;:!?]+)$/);
  if (!match) return { url, rest: "" };
  return { url: match[1], rest: match[2] };
}

function linkifyPlain(text: string, seen: Set<string>): ChatPart[] {
  const withoutDupes = text.replace(
    /[ \t]*\([ \t]*(https?:\/\/[^)\s]+)[ \t]*\)/g,
    (full, url: string) => {
      const href = normalizeChatHref(trimTrailingPunctuation(url).url);
      return href && seen.has(href) ? "" : full;
    },
  );

  const parts: ChatPart[] = [];
  let last = 0;
  for (const match of collectMatches(withoutDupes, BARE_URL)) {
    const index = match.index ?? 0;
    const trimmed = trimTrailingPunctuation(match[0]);
    const href = normalizeChatHref(trimmed.url);
    if (index > last) parts.push(...linkifyPaths(withoutDupes.slice(last, index), seen));
    if (!href || seen.has(href)) {
      if (!href) parts.push({ type: "text", value: match[0] });
    } else {
      seen.add(href);
      parts.push({ type: "link", label: labelFor(trimmed.url, href), href });
      if (trimmed.rest) parts.push({ type: "text", value: trimmed.rest });
    }
    last = index + match[0].length;
  }
  if (last < withoutDupes.length) parts.push(...linkifyPaths(withoutDupes.slice(last), seen));
  return parts;
}

function linkifyEmails(text: string): ChatPart[] {
  const parts: ChatPart[] = [];
  let last = 0;
  for (const match of collectMatches(text, EMAIL)) {
    const index = match.index ?? 0;
    const trimmed = trimTrailingPunctuation(match[0]);
    if (!isEmailAddress(trimmed.url)) continue;
    if (index > last) parts.push({ type: "text", value: text.slice(last, index) });
    parts.push({ type: "link", label: trimmed.url, href: mailtoHref(trimmed.url) });
    if (trimmed.rest) parts.push({ type: "text", value: trimmed.rest });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts;
}

function linkifyPaths(text: string, seen: Set<string>): ChatPart[] {
  const parts: ChatPart[] = [];
  let last = 0;
  for (const match of collectMatches(text, BARE_PATH)) {
    const index = match.index ?? 0;
    const prefix = match[1] ?? "";
    const path = match[2] ?? "";
    const href = normalizeChatHref(path);
    const start = index + prefix.length;
    if (start > last) parts.push(...linkifyEmails(text.slice(last, start)));
    if (!href || seen.has(href)) {
      parts.push({ type: "text", value: path });
    } else {
      seen.add(href);
      parts.push({ type: "link", label: labelFor(path, href), href });
    }
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(...linkifyEmails(text.slice(last)));
  return parts;
}

function linkifyInline(text: string, seen: Set<string>): ChatPart[] {
  const parts: ChatPart[] = [];
  let last = 0;
  for (const match of collectMatches(text, BOLD)) {
    const index = match.index ?? 0;
    const inner = match[1].trim();
    if (index > last) parts.push(...linkifyPlain(text.slice(last, index), seen));
    if (isEmailAddress(inner)) {
      parts.push({ type: "link", label: inner, href: mailtoHref(inner) });
    } else {
      const innerParts = linkifyPlain(inner, seen);
      if (innerParts.length) parts.push({ type: "bold", parts: innerParts });
    }
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(...linkifyPlain(text.slice(last), seen));
  return parts;
}

function stripIncompleteBold(text: string): string {
  const marks = collectMatches(text, /\*\*/g);
  if (marks.length % 2 === 0) return text;
  const last = marks[marks.length - 1];
  return text.slice(0, last.index ?? text.length);
}

function mergeText(parts: ChatPart[]): ChatPart[] {
  const merged: ChatPart[] = [];
  for (const part of parts) {
    if (part.type === "text" && part.value === "") continue;
    const previous = merged[merged.length - 1];
    if (part.type === "text" && previous?.type === "text") {
      previous.value += part.value;
    } else {
      merged.push(part);
    }
  }
  return merged;
}

export function parseAssistantMessage(raw: string): ChatPart[] {
  const text = stripIncompleteBold(stripIncompleteLink(softenDashes(raw)));
  const parts: ChatPart[] = [];
  const seen = new Set<string>();
  let last = 0;

  for (const match of collectMatches(text, MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    const href = normalizeChatHref(match[2]);
    if (index > last) parts.push(...linkifyInline(text.slice(last, index), seen));
    if (!href) {
      parts.push(...linkifyInline(match[1], seen));
    } else if (!seen.has(href)) {
      seen.add(href);
      parts.push({ type: "link", label: labelFor(match[1], href), href });
    }
    last = index + match[0].length;
  }

  if (last < text.length) parts.push(...linkifyInline(text.slice(last), seen));
  return mergeText(parts);
}
