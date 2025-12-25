import Container from '@/components/Container';
import Carousel from '@/components/Carousel';
import SpeakerCard from '@/components/SpeakerCard';
import { SPEAKERS } from '@/constants/speakers';
import { useSlideUp, useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section3.svg';

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
      className="py-20 bg-bg border-t border-b border-[#41424a]">
      <Container className="flex flex-col gap-24">
        {/* 섹션 제목 */}
        <div className="text-center">
          <img
            width={'100%'}
            height={'auto'}
            src={title}
          />
        </div>

        {/* 스피커 캐로셀 */}
        <div
          ref={carouselRef}
          className="flex flex-col gap-24">
          <Carousel
            className="pl-[115px] border-t border-b border-zinc-700"
            itemWidth={332}
            gap={0}
            showOverlay={true}>
            {SPEAKERS.map((speaker, index) => (
              <SpeakerCard
                key={index}
                {...speaker}
              />
            ))}
          </Carousel>

          <Carousel
            className="pl-[115px] border-t border-b border-zinc-700"
            itemWidth={332}
            gap={0}
            showOverlay={true}>
            {SPEAKERS.map((speaker, index) => (
              <SpeakerCard
                key={`second-${index}`}
                {...speaker}
              />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
