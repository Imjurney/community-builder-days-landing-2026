import Container from '@/components/Container';
import OverviewBox from '@/components/OverviewBox';
import { useFadeIn, useStagger } from '@/lib/gsap';
import { OVERVIEW_ITEMS } from '@/constants/overview';
import title from '@/assets/sectionTitle/title_section1.svg';

export default function Overview() {
  const contentRef = useFadeIn<HTMLDivElement>({
    duration: 0.8,
    delay: 0.2,
  });

  const boxesRef = useStagger<HTMLDivElement>('.overview-box', {
    duration: 0.6,
    delay: 0.5,
    stagger: 0.1,
    from: { opacity: 0, y: 20 },
  });

  return (
    <section
      id="overview"
      className="bg-bg py-20 border-t border-b border-brand-stroke">
      <Container className="py-0 flex flex-col gap-16">
        <div
          ref={contentRef}
          className="relative">
          {/* 콘텐츠 박스 */}
          <img
            className="mr-auto"
            src={title}
            width={801}
            height={416}
            alt="Overview"
          />
        </div>

        {/* Overview 박스들 */}
        <div
          ref={boxesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-brand-stroke">
          {OVERVIEW_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="overview-box border border-(--stroke) first:border-l-0 last:border-r-0">
              <OverviewBox
                title={item.title}
                iconLg={item.iconLg}
                iconSm={item.iconSm}
                index={index}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
