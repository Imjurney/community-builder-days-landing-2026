import Container from "@/components/Container";
import { useSlideUp, useFadeIn } from "@/lib/gsap";

// 시계 아이콘 SVG
const clockIcon =
  "http://localhost:3845/assets/25a4df3a710e40a4788c16f4a87c6ed56f9c66ff.svg";

export default function Hero() {
  // GSAP 애니메이션 refs
  const titleRef = useSlideUp<HTMLDivElement>({
    duration: 1,
    delay: 0.3,
  });

  const infoRef = useFadeIn<HTMLDivElement>({
    duration: 0.8,
    delay: 0.6,
  });

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden -mt-[88px] pt-[88px]"
    >
      {/* 데스크톱 배경 이미지 - 최적화된 로딩 */}
      <div className="hidden lg:block absolute inset-0 w-full h-full">
        <img
          src="/mainBackground.svg"
          alt=""
          className="w-screen h-screen object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 모바일/태블릿 대체 배경 */}
      <div className="lg:hidden absolute inset-0 opacity-70">
        <div className="absolute -top-40 left-1/2 h-xl w-xl -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-md w-md rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <Container className="relative z-10 ml-14 flex items-start justify-start min-h-screen pt-32">
        <div className="flex flex-col gap-8 items-start">
          {/* 메인 타이틀 */}
          <div ref={titleRef} className="text-fancy-large-title1 text-white">
            <p className="mb-0">AWS community</p>
            <p className="mb-0">builder's day KOREA</p>
          </div>

          {/* 날짜 및 장소 정보 */}
          <div ref={infoRef} className="flex gap-2 items-center">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={clockIcon} alt="시계 아이콘" className="w-6 h-6" />
            </div>
            <p className="text-english-title3 text-white">
              2026.01.24, CENTER FIELD, 18F, Seoul
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
