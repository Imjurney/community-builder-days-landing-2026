import Container from "@/components/Container";
import Button from "@/components/Button";

import { EVENT } from "@/constants/event";

export default function CTA() {
  return (
    <section className="border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-8 sm:p-10">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            함께 만들고, 함께 성장해요
          </h2>
          <p className="mt-2 max-w-2xl text-muted-fg">
            좌석은 한정되어 있어요. 지금 등록하고, 행사 전 참가자 안내 메일과
            준비물을 받아보세요.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={EVENT.registerUrl} target="_blank" rel="noreferrer">
              등록하기
            </Button>
            <Button href={`mailto:${EVENT.contactEmail}`} variant="secondary">
              후원/문의하기
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
