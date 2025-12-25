import Container from '@/components/Container';
import { useFadeIn } from '@/lib/gsap';
import mapImage from '@/assets/map/map.svg';
import title from '@/assets/sectionTitle/title_section4.svg';
import subwayIcon from '@/assets/icons/subway.svg';
import busIcon from '@/assets/icons/bus.svg';
import { VENUE_DATA, DIRECTIONS_METHODS } from '@/constants/venue';
import {
  textBody1,
  textFancyLargeTitle1,
  textFancyLargeTitle2,
  textLargeTitle1,
  textTitle2,
} from '@/lib/utils';

const getIconSrc = (iconName: string) => {
  const iconMap: Record<string, string> = {
    subway: subwayIcon,
    bus: busIcon,
  };
  return iconMap[iconName];
};

export default function Venue() {
  const mapRef = useFadeIn<HTMLDivElement>({
    duration: 0.8,
    delay: 0.2,
  });

  const contentRef = useFadeIn<HTMLDivElement>({
    duration: 0.8,
    delay: 0.35,
  });

  return (
    <section
      id="venue"
      className="bg-bg py-20 border border-brand-stroke">
      <Container className="py-0 flex flex-col border border-(--stroke)">
        {/* 타이틀 이미지 */}
        <img
          className="ml-auto"
          src={title}
          width={545}
          height={320}
          alt="오시는 길"
        />

        <div className="flex gap-0">
          {/* 지도 */}
          <div
            ref={mapRef}
            className="flex-1 border-r border-brand-stroke">
            <img
              width={616}
              height={416}
              src={mapImage}
              alt="오시는 길 지도"
              className="w-full h-full"
            />
          </div>

          {/* 정보 */}
          <div
            ref={contentRef}
            className="flex flex-col gap-16 justify-center px-14 py-18 w-[545px]">
            {/* 장소 정보 */}
            <div className="flex justify-between items-end w-full">
              <div>
                <h3 className={textFancyLargeTitle2('text-white')}>
                  Center Field
                </h3>
                <div className="flex items-start justify-between. mt-[3px]">
                  <div className={textTitle2('text-white')}>
                    <p>{VENUE_DATA.address}</p>
                    <p>{VENUE_DATA.building}</p>
                  </div>
                </div>
              </div>
              <button
                data-size="medium"
                className="px-3.5 py-2.5 bg-violet-600/60 rounded-2xl cursor-pointer backdrop-blur-[5px] inline-flex justify-center items-center">
                <span className={textBody1('text-white')}>구글 지도 보기</span>
              </button>
            </div>

            {/* 교통 정보 */}
            <div className="flex flex-col gap-6">
              {DIRECTIONS_METHODS.map((method) => {
                const iconSrc = getIconSrc(method.icon);

                return (
                  <div
                    key={method.title}
                    className="flex items-center gap-4">
                    <img
                      src={iconSrc}
                      alt={method.title}
                      width={32}
                      height={32}
                      className="flex-shrink-0"
                    />

                    <ul className={textBody1('text-(--opacity-w040)')}>
                      {method.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
