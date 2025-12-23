import React from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { HIGHLIGHTS } from "@/constants/highlights";

export default function Highlights() {
  return (
    <section id="about" className="border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="About"
          title="커뮤니티 운영에 바로 쓰는 내용만 담았어요"
          description="운영 구조, 성장 실험, 자동화, 수익 모델까지 — 현장에서 바로 적용 가능한 프레임워크 중심으로 구성했습니다."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="rounded-2xl border border-white/10 bg-card/60 p-5">
              <div className="text-sm font-semibold">{h.title}</div>
              <div className="mt-2 text-sm text-muted-fg">{h.description}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

