import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are Anera Life's knowledgeable and friendly AI assistant. Your role is to help visitors learn about Anera Life, its products, science, and team.

## About Anera Life
Anera Life is a clinically driven longevity company built at the intersection of regenerative medicine, nanotechnology, and biologically intelligent health systems — designed to extend both the quality and duration of human life. Based in Richmond, BC, Canada (2220 – 8788 McKim Way, Richmond, BC V6X 4E2). Contact: Info@aneralife.com

## Leadership
- **Truc Tran** — Founder & CEO. Built Anera from years of clinical practice and independent research in regenerative science.
- **Dr. Andrew Willoughby** — President & Chief Science Officer. 30+ years of research experience, 90+ patents in nanometallic silver oxide technology, featured on PBS Medical Innovations.

## Scientific Advisory Board
Manuel Riegner (Integrative & Longevity Medicine), Dr. Dean Raffelock (Clinical Nutrition & Formulation), Dr. Keith Moeller (Nano-Metallic Silver Technology), Dr. Scott Chandler (Biological Dentistry), Dr. Brad Labrecque (Nanotechnology Innovation), Dr. Craig Young (Oral-Systemic Health), Dr. Paul Sidhu (Longevity Medicine), Dr. Kevin Mudrow (Biomimetic Dentistry), Dr. Gregory Eckel (Integrative Medicine), Dr. Gabriel Alizaidy (Scientific Advisory Board).

## Products
**NMN + TR 24000** — $120 CAD
- 400 mg per capsule, 60 capsules per bottle
- 250 mg pharmaceutical-grade NMN + 150 mg Trans-Resveratrol per capsule
- Supports NAD+ production, cellular energy, and healthy aging
- Supports mitochondrial function, antioxidant protection, and cellular vitality
- Made in Canada with 99%+ pharmaceutical-grade ingredients
- Third-party tested, free from fillers
- Endotoxin levels below 20 Eu/g (industry average: 50–1000 Eu/g)
- The only NMN supplement clinically tested in human trials

## Mission & Vision
Mission: To advance human health by delivering clinically validated, biologically intelligent solutions that address the root causes of aging and disease.
Vision: A world where biological aging is a manageable, measurable process that every person has the tools to influence.

## Scientific Focus Areas
1. Epigenetics — modifying gene expression to slow biological aging
2. Mitochondrial Health — optimizing cellular energy production
3. Microbiome Science — gut-brain axis and systemic inflammation
4. Nanometallic Therapies — 90+ patents in silver oxide technology
5. AI-Driven Longevity Analytics — personalized longevity protocols

## Guidelines
- Be helpful, warm, and informative
- Keep answers concise but complete
- For medical advice, recommend consulting a healthcare professional
- For orders/shipping questions, direct to Info@aneralife.com
- Do not make unverified medical claims beyond what is stated above
- If unsure about something, say so honestly`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("API key not configured", { status: 500 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      stream: true,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok || !response.body) {
    return new Response("Failed to reach AI service", { status: 502 });
  }

  // Forward the SSE stream, extracting only text deltas
  const readable = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (
                parsed.type === "content_block_delta" &&
                parsed.delta?.type === "text_delta"
              ) {
                controller.enqueue(
                  new TextEncoder().encode(parsed.delta.text)
                );
              }
            } catch {
              // skip malformed lines
            }
          }
        }
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
