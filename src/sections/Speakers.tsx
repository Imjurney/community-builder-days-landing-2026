import React from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SPEAKERS } from "@/constants/speakers";

export default function Speakers() {
  return (
    <section id="speakers" className="border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Speakers"
          title="현장에서 검증된 운영 경험"
          description="운영/성장/수익화의 각각 다른 관점에서 ‘진짜 사례’를 공유합니다."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {SPEAKERS.map((s) => (
            <article key={s.name} className="rounded-2xl border border-white/10 bg-card/60 p-6">
              <div className="text-sm font-semibold">{s.name}</div>
              <div className="mt-1 text-sm text-muted-fg">
                {s.title} · {s.org}
              </div>
              <div className="mt-4 text-sm font-medium">{s.topic}</div>
              <p className="mt-2 text-sm text-muted-fg">{s.bio}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

