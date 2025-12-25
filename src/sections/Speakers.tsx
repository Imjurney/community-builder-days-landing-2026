import Container from '@/components/Container';
import Carousel from '@/components/Carousel';
import SpeakerCard from '@/components/SpeakerCard';
import { SPEAKERS } from '@/constants/speakers';
import { getSessionsBySpeakerId } from '@/constants/schedule';
import { useSlideUp, useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section3.svg';
import titleSm from '@/assets/sectionTitle/title_section3_sm.svg';
import { useState } from 'react';

export default function Speakers() {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    const titleRef = useSlideUp<HTMLHeadingElement>({
        duration: 1,
        delay: 0.2,
    });

    const carouselRef = useFadeIn<HTMLDivElement>({
        duration: 0.8,
        delay: 0.5,
    });

    // Community Builders와 Heroes 분리
    const communityBuilders = SPEAKERS.filter((speaker) => speaker.org.includes('CB'));
    const heroes = SPEAKERS.filter((speaker) => speaker.org.includes('Hero'));

    // Community Builders를 그룹으로 나누기 (4명씩)
    const speakersPerRow = 4;
    const cbRows: typeof SPEAKERS[] = [];
    for (let i = 0; i < communityBuilders.length; i += speakersPerRow) {
        cbRows.push(communityBuilders.slice(i, i + speakersPerRow));
    }

    const handleCardClick = (cardId: string) => {
        // 같은 카드를 클릭하면 토글, 다른 카드를 클릭하면 해당 카드 열기
        setActiveCardId((prev) => (prev === cardId ? null : cardId));
    };

    return (
        <section
            id="speakers"
            className="py-16 xl:py-20 bg-bg border-t border-b border-[#41424a]">
            <Container className="flex flex-col gap-8 xl:gap-24">
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
                    className="flex flex-col gap-8 xl:gap-24">
                    {/* Community Builders 섹션 */}
                    <div className="flex flex-col gap-8 xl:gap-12">
                        <h3 className="text-2xl xl:text-3xl font-bold text-white text-center" style={{ fontFamily: 'Apple SD Gothic Neo, sans-serif' }}>
                            AWS Community Builders
                        </h3>
                        {cbRows.map((rowSpeakers, rowIndex) => (
                            <Carousel
                                key={rowIndex}
                                className="pl-5 xl:pl-[115px] border-t border-b border-zinc-700"
                                itemWidth={332}
                                gap={0}
                                showOverlay={true}>
                                {rowSpeakers.map((speaker) => {
                                    const sessions = getSessionsBySpeakerId(speaker.id);
                                    return (
                                        <SpeakerCard
                                            key={speaker.id}
                                            {...speaker}
                                            sessions={sessions}
                                            isActive={activeCardId === speaker.id}
                                            onCardClick={handleCardClick}
                                        />
                                    );
                                })}
                            </Carousel>
                        ))}
                    </div>

                    {/* AWS Heroes 섹션 */}
                    <div className="flex flex-col gap-8 xl:gap-12">
                        <h3 className="text-2xl xl:text-3xl font-bold text-white text-center" style={{ fontFamily: 'Apple SD Gothic Neo, sans-serif' }}>
                            AWS Heroes
                        </h3>
                        <Carousel
                            className="pl-5 xl:pl-[115px] border-t border-b border-zinc-700"
                            itemWidth={332}
                            gap={0}
                            showOverlay={true}>
                            {heroes.map((speaker) => {
                                const sessions = getSessionsBySpeakerId(speaker.id);
                                return (
                                    <SpeakerCard
                                        key={speaker.id}
                                        {...speaker}
                                        sessions={sessions}
                                        isActive={activeCardId === speaker.id}
                                        onCardClick={handleCardClick}
                                    />
                                );
                            })}
                        </Carousel>
                    </div>
                </div>
            </Container>
        </section>
    );
}
