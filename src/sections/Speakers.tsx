import Container from '@/components/Container';
import Carousel from '@/components/Carousel';
import SpeakerCard from '@/components/SpeakerCard';
import { SPEAKERS } from '@/constants/speakers';
import { useSlideUp, useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section3.svg';
import titleSm from '@/assets/sectionTitle/title_section3_sm.svg';

export default function Speakers() {
  const titleRef = useSlideUp<HTMLHeadingElement>({
    duration: 1,
    delay: 0.2,
  });

  const carouselRef = useFadeIn<HTMLDivElement>({
    duration: 0.8,
    delay: 0.5,
  });

  // 스피커를 두 그룹으로 나누기 (6명씩)
  const midPoint = Math.ceil(SPEAKERS.length / 2);
  const firstRowSpeakers = SPEAKERS.slice(0, midPoint);
  const secondRowSpeakers = SPEAKERS.slice(midPoint);

  return (
    <section
      id="speakers"
      className="py-20 bg-bg border-t border-b border-[#41424a]">
      <Container className="flex flex-col gap-24">
        {/* 섹션 제목 */}
        <div className="text-center">
          <img
            className="hidden xl:block"
            width={'100%'}
            height={'auto'}
            src={title}
            alt="Speakers"
          />
          <img
            className="xl:hidden block"
            width={'100%'}
            height={'auto'}
            src={titleSm}
            alt="Speakers"
          />
        </div>

        {/* 스피커 캐로셀 */}
        <div
          ref={carouselRef}
          className="flex flex-col gap-24">
          {/* 첫 번째 줄 */}
          <Carousel
            className="pl-[115px] border-t border-b border-zinc-700"
            itemWidth={332}
            gap={0}
            showOverlay={true}>
            {firstRowSpeakers.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                {...speaker}
              />
            ))}
          </Carousel>

          {/* 두 번째 줄 */}
          <Carousel
            className="pl-[115px] border-t border-b border-zinc-700"
            itemWidth={332}
            gap={0}
            showOverlay={true}>
            {secondRowSpeakers.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                {...speaker}
              />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
