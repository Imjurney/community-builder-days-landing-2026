import React from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SCHEDULE } from "@/constants/schedule";

export default function Schedule() {
  return (
    <section id="schedule" className="border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Schedule"
          title="하루를 알차게"
          description="세션과 워크숍 사이사이 네트워킹 시간을 충분히 확보했습니다."
        />

        <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-card/60">
          {SCHEDULE.map((item) => (
            <div key={`${item.time}-${item.title}`} className="grid gap-3 p-5 sm:grid-cols-12">
              <div className="sm:col-span-2">
                <div className="text-sm font-semibold">{item.time}</div>
              </div>
              <div className="sm:col-span-7">
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description ? (
                  <div className="mt-1 text-sm text-muted-fg">{item.description}</div>
                ) : null}
              </div>
              <div className="sm:col-span-3 sm:text-right">
                {item.meta ? <div className="text-sm text-muted-fg">{item.meta}</div> : null}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

