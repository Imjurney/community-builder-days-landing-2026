export default function Hero() {
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
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </div>

      {/* 모바일/태블릿 대체 배경 */}
      <div className="lg:hidden absolute inset-0 opacity-70">
        <div className="absolute -top-40 left-1/2 h-xl w-xl -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-md w-md rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* 콘텐츠는 나중에 추가 */}
      <div className="relative z-10">{/* 콘텐츠 영역 */}</div>
    </section>
  );
}
