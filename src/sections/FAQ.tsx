import React from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { FAQ as FAQ_ITEMS } from "@/constants/faq";

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="운영 정책은 행사 성격에 따라 바뀔 수 있어요. 최신 정보는 등록 페이지를 확인해 주세요."
        />

        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-card/60 p-5 open:shadow-glow"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold">
                {item.q}
                <span className="float-right text-muted-fg transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-fg">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

