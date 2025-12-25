import Container from '@/components/Container';
import { useFadeIn } from '@/lib/gsap';

export default function Overview() {
    const contentRef = useFadeIn<HTMLDivElement>({
        duration: 0.8,
        delay: 0.2,
    });

    // const boxesRef = useStagger<HTMLDivElement>('.overview-box', {
    //   duration: 0.6,
    //   delay: 0.5,
    //   stagger: 0.1,
    //   from: { opacity: 0, y: 20 },
    // });

    return (
        <section
            id="overview"
            className="bg-bg   border-t border-b border-brand-stroke">
            <Container className="py-0 flex flex-col gap-16">
                <div
                    ref={contentRef}
                    className="relative">
                    {/* Desktop version */}
                    <div className="hidden xl:block w-[801px] h-[416px] relative overflow-hidden">
                        {/* Grid pattern */}
                        <div className="absolute inset-0">
                            {/* Vertical lines */}
                            {Array.from({ length: 26 }).map((_, i) => (
                                <div
                                    key={`v-${i}`}
                                    className="absolute h-full w-[1px] bg-[#41424A]"
                                    style={{ left: `${32 + i * 32}px` }}
                                />
                            ))}
                            {/* Horizontal lines */}
                            {Array.from({ length: 14 }).map((_, i) => (
                                <div
                                    key={`h-${i}`}
                                    className="absolute w-full h-[1px] bg-[#41424A]"
                                    style={{ top: `${31.5 + i * 32}px` }}
                                />
                            ))}
                        </div>
                        {/* Orange highlight shape */}
                        <div
                            className="absolute bg-[#FF9900] opacity-60"
                            style={{
                                left: '31.5px',
                                top: '31px',
                                width: '673px',
                                height: '353px',
                                clipPath: 'polygon(0 0, 289px 0, 289px 64px, 673px 64px, 673px 353px, 0 353px)',
                            }}
                        />
                        {/* Text content */}
                        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white" style={{ marginTop: '-25px' }}>
                            <p className="text-[28px] mb-2" style={{ fontFamily: 'Pixelify Sans, sans-serif', marginBottom: '30px' }}>
                                Program mission
                            </p>
                            <h2 className="text-[45px] font-bold leading-tight mb-4" style={{ marginBottom: '35px', fontFamily: 'Apple SD Gothic Neo, sans-serif' }}>
                                AWS Community
                                <br />
                                Builders Day Korea는
                            </h2>
                            <p className="text-xl leading-relaxed" style={{ fontFamily: 'Apple SD Gothic Neo, sans-serif' }}>
                                커뮤니티 Builder와 Hero가

                                각자의 전문 분야에 대한
                                <br />
                                세션과 인사이트를 제공하는 행사입니다.
                            </p>
                        </div>
                    </div>

                    {/* Mobile version */}
                    <div className="xl:hidden w-full h-[320px] relative overflow-hidden">
                        {/* Grid pattern */}
                        <div className="absolute inset-0">
                            {/* Vertical lines */}
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={`v-${i}`}
                                    className="absolute h-full w-[1px] bg-[#41424A]"
                                    style={{ left: `${32 + i * 32}px` }}
                                />
                            ))}
                            {/* Horizontal lines */}
                            {Array.from({ length: 11 }).map((_, i) => (
                                <div
                                    key={`h-${i}`}
                                    className="absolute w-full h-[1px] bg-[#41424A]"
                                    style={{ top: `${31.5 + i * 32}px` }}
                                />
                            ))}
                        </div>
                        {/* Orange highlight shape */}
                        <div
                            className="absolute bg-[#FF9900] opacity-60"
                            style={{
                                left: '0',
                                top: '32px',
                                width: '360px',
                                height: '255px',
                                clipPath: 'polygon(0 0, 287.5px 0, 287.5px 64px, 360px 64px, 360px 255px, 0 255px)',
                            }}
                        />
                        {/* Text content */}
                        <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
                            <p className="text-xs mb-2" style={{ fontFamily: 'Pixelify Sans, sans-serif' }}>
                                Program mission
                            </p>
                            <h2 className="text-2xl font-bold leading-tight mb-3" style={{ fontFamily: 'Apple SD Gothic Neo, sans-serif' }}>
                                AWS Community
                                <br />
                                Builder's Day Korea 는
                            </h2>
                            <p className="text-base leading-relaxed" style={{ fontFamily: 'Apple SD Gothic Neo, sans-serif' }}>
                                커뮤니티 Builder와 Hero가
                                <br />
                                각자의 전문 분야에 대한
                                <br />
                                세션과 인사이트를 제공하는 행사입니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Overview 박스들 */}
                {/* <div
          ref={boxesRef}
          className="grid grid-cols-2 lg:grid-cols-4 border border-brand-stroke">
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
        </div> */}
            </Container>
        </section>
    );
}
