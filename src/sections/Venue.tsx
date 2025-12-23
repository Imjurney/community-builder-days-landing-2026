import React from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

const venue = {
  name: "성수 커뮤니티 홀",
  address: "서울 성동구 ○○로 00",
  note: "지하철 2호선 성수역 도보 7분",
  mapUrl: "https://maps.google.com",
};

export default function Venue() {
  return (
    <section id="venue" className="border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Venue"
          title="찾아오기 쉬운 성수"
          description="오프라인 네트워킹이 핵심인 만큼, 이동과 동선이 좋은 곳으로 준비했습니다."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-card/60 p-6 lg:col-span-2">
            <div className="text-sm font-semibold">{venue.name}</div>
            <div className="mt-2 text-sm text-muted-fg">{venue.address}</div>
            <div className="mt-2 text-sm text-muted-fg">{venue.note}</div>
            <div className="mt-6">
              <Button href={venue.mapUrl} target="_blank" rel="noreferrer" variant="secondary">
                지도 열기
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card/60 p-6">
            <div className="text-sm font-semibold">현장 안내</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li>• 체크인은 10:00부터 시작합니다.</li>
              <li>• 개인 텀블러/노트북 지참 권장 (워크숍).</li>
              <li>• 주차는 공간 상황에 따라 제한될 수 있어요.</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

