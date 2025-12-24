import Container from "@/components/Container";
import Carousel from "@/components/Carousel";
import SpeakerCard from "@/components/SpeakerCard";
import { SPEAKERS } from "@/constants/speakers";
import { useSlideUp, useFadeIn } from "@/lib/gsap";

export default function Speakers() {
  const titleRef = useSlideUp<HTMLHeadingElement>({
    duration: 1,
    delay: 0.2,
  });

  const carouselRef = useFadeIn<HTMLDivElement>({
    duration: 0.8,
    delay: 0.5,
  });

  return (
    <section
      id="speakers"
      className="py-20 bg-bg border-t border-b border-[#41424a]"
    >
      <Container>
        {/* 섹션 제목 */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-fancy-large-title2 text-white mb-4"
          >
            Speakers
          </h2>
          <p className="text-body1 text-muted-fg max-w-2xl mx-auto">
            다양한 분야의 전문가들이 커뮤니티 빌딩에 대한 실전 경험과 노하우를
            공유합니다.
          </p>
        </div>

        {/* 스피커 캐로셀 */}
        <div ref={carouselRef}>
          <Carousel
            className="px-[115px]"
            itemWidth={332}
            gap={0}
            showOverlay={true}
          >
            {SPEAKERS.map((speaker, index) => (
              <SpeakerCard
                key={index}
                org={speaker.org}
                name={speaker.name}
                title={speaker.title}
                topic={speaker.topic}
                profileImage={speaker.profileImage}
              />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
