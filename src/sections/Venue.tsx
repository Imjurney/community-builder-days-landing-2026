import Container from '@/components/Container';
import { useFadeIn } from '@/lib/gsap';
import mapImage from '@/assets/map/map.svg';
import title from '@/assets/sectionTitle/title_section4.svg';
import subwayIcon from '@/assets/icons/subway.svg';
import busIcon from '@/assets/icons/bus.svg';
import { VENUE_DATA, DIRECTIONS_METHODS } from '@/constants/venue';

const getIconSrc = (iconName: string) => {
  const iconMap: Record<string, string> = {
    subway: subwayIcon,
    bus: busIcon,
    car: '🚗',
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
      className="bg-bg border-t border-b border-brand-stroke">
      <Container className="py-0 flex flex-col">
        <img
          className="ml-auto"
          src={title}
          width={554}
          height={320}
          alt="오시는 길"
        />

        <div className="flex">
          {/* 지도 */}
          <div
            ref={mapRef}
            className="border border-brand-stroke">
            <img
              width={831}
              height={439}
              src={mapImage}
              alt="오시는 길 지도"
              className="object-cover"
            />
          </div>

          {/* 정보 */}
          <div
            ref={contentRef}
            className="w-[545px] flex flex-col justify-center gap-8">
            {/* 장소 정보 */}
            <div className="space-y-4">
              <h3 className="text-title1 text-white">{VENUE_DATA.name}</h3>
              <div className="space-y-2 text-muted-fg">
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  {VENUE_DATA.address}
                </p>
              </div>
            </div>

            {/* 교통 정보 */}
            <div className="space-y-4">
              {DIRECTIONS_METHODS.map((method) => {
                const iconSrc = getIconSrc(method.icon);
                const isEmoji =
                  typeof iconSrc === 'string' && iconSrc.length === 1;

                return (
                  <div
                    key={method.title}
                    className="p-4 rounded-xl bg-card border border-brand-stroke/60">
                    <h4 className="text-title2 text-white mb-2 flex items-center gap-2">
                      {isEmoji ? (
                        <span>{iconSrc}</span>
                      ) : (
                        <img
                          src={iconSrc}
                          alt={method.title}
                          width={24}
                          height={24}
                        />
                      )}
                      {method.title}
                    </h4>
                    <ul className="space-y-1 text-muted-fg text-sm">
                      {method.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {detail}
                        </li>
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
