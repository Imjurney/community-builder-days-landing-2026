import React from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SPONSORS } from "@/constants/sponsors";

const tierLabel: Record<(typeof SPONSORS)[number]["tier"], string> = {
  partner: "Partner",
  supporting: "Supporting",
  community: "Community",
};

export default function Sponsors() {
  return (
    <section id="sponsors" className="border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Sponsors"
          title="함께 만드는 행사"
          description="후원/파트너십 문의는 페이지 하단 이메일로 연락 주세요."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {SPONSORS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-card/60 p-6 transition hover:bg-white/5"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-fg">
                {tierLabel[s.tier]}
              </div>
              <div className="mt-2 text-sm font-semibold">{s.name}</div>
              <div className="mt-1 text-sm text-muted-fg">{s.url}</div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

