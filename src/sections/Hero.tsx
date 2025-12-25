import Container from '@/components/Container';
import { useSlideUp, useFadeIn } from '@/lib/gsap';
import clockIcon from '@/assets/icons/clock.svg';

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
      className="relative h-screen overflow-hidden -mt-[88px] pt-[88px]">
      {/* 데스크톱 배경 이미지 - 최적화된 로딩 */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/mainBackground.svg"
          alt=""
          className="w-screen h-screen object-cover object-center hidden xl:block"
          loading="eager"
          decoding="async"
        />

        <img
          src="/mainBackground_sm.svg"
          alt=""
          className="w-screen h-screen object-cover object-center xl:hidden block"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <Container className="relative z-10 ml-5 xl:ml-14 flex items-start justify-start min-h-screen pt-6 xl:pt-32">
        <div className="flex flex-col gap-4 xl:gap-8 items-start">
          {/* 메인 타이틀 */}
          <div
            ref={titleRef}
            className="hero-title text-white">
            <p className="mb-0">
              AWS <br className="xl:hidden" />
              community
            </p>
            <p className="mb-0">builders day KOREA</p>
          </div>

          {/* 날짜 및 장소 정보 */}
          <div
            ref={infoRef}
            className="flex gap-2 items-center">
            <div className="w-6 h-6 xl:w-8 xl:h-8 flex items-center justify-center">
              <img
                width={32}
                height={32}
                src={clockIcon}
                alt="시계 아이콘"
              />
            </div>
            <p className="hero-time text-white">
              2026.01.24, CENTER FIELD, <br className="xl:hidden" />
              18F, Seoul
            </p>
          </div>
          <button
            type="button"
            data-size="large"
            className="mt-4 xl:mt-0 xl:translate-x-0 py-2.5 px-3.5 xl:py-4 xl:px-8 hero-button bg-(--opacity-s060) cursor-pointer text-white rounded-2xl backdrop-blur-[5px] inline-flex justify-center items-center transition-colors duration-300 hover:bg-amber-500/80">
            참가하러 가기
          </button>
        </div>
      </Container>
    </section>
  );
}
