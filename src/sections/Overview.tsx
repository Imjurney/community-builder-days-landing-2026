import Container from "@/components/Container";
import ProgramMissionCard from "@/components/ProgramMissionCard";
import ProgramMissionCardMobile from "@/components/ProgramMissionCardMobile";
import { useFadeIn } from "@/lib/gsap";
import { OVERVIEW_DATA } from "@/constants/overview";

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
      className="bg-bg border-t border-b border-brand-stroke xl:pt-5"
    >
      <Container className="py-0 flex flex-col gap-16">
        <div
          ref={contentRef}
          className="relative flex flex-col xl:flex-row gap-3 xl:gap-5"
        >
          {/* Desktop version - Left side */}
          <ProgramMissionCard
            title={OVERVIEW_DATA.programMission.title}
            subtitle={OVERVIEW_DATA.programMission.subtitle}
            description={OVERVIEW_DATA.programMission.description}
          />

          {/* Right side - AWS Community Builder Introduction */}
          <div className="hidden xl:flex flex-col justify-center text-white flex-1 px-8">
            <h3 className="text-title0 mb-6">
              {OVERVIEW_DATA.communityBuilder.title}
            </h3>
            <div className="space-y-6 text-body1">
              {OVERVIEW_DATA.communityBuilder.description
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph.split("\n").map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < paragraph.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
            </div>
          </div>

          {/* Mobile version */}
          <ProgramMissionCardMobile
            title={OVERVIEW_DATA.programMission.title}
            subtitle={OVERVIEW_DATA.programMission.subtitle}
            description={OVERVIEW_DATA.programMission.description}
          />
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
