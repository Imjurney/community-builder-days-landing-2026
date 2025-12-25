import Container from '@/components/Container';
import { ScheduleRow } from '@/components/ScheduleRow';
import { ScheduleTrackHeader } from '@/components/ScheduleTrackHeader';
import { SessionModal } from '@/components/SessionModal';
import {
    SCHEDULE_ROWS,
    SCHEDULE_TRACKS,
    getSpeakerById,
} from '@/constants/schedule';
import { useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section2.svg';
import titleSm from '@/assets/sectionTitle/title_section2_sm.svg';
import { useState, useRef, useEffect } from 'react';

export default function Schedule() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showExpandButton, setShowExpandButton] = useState(false);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(408);
    const mobileScheduleRef = useRef<HTMLDivElement>(null);

    // Modal state
    const [modalData, setModalData] = useState<{
        isOpen: boolean;
        title: string;
        description?: string;
        speaker?: {
            name: string;
            org: string;
            profileImage: string;
        };
        position: { x: number; y: number };
    }>({
        isOpen: false,
        title: '',
        description: '',
        speaker: undefined,
        position: { x: 0, y: 0 },
    });

    const handleSessionHover = (
        session: {
            title: string;
            description?: string;
            speaker: {
                name: string;
                org: string;
                profileImage: string;
            };
        } | null,
        event?: React.MouseEvent
    ) => {
        if (session && event) {
            setModalData({
                isOpen: true,
                ...session,
                position: { x: event.clientX, y: event.clientY },
            });
        } else {
            setModalData((prev) => ({ ...prev, isOpen: false }));
        }
    };

    const gridRef = useFadeIn<HTMLTableElement>({
        duration: 0.8,
        delay: 0.35,
    });

    // 모바일 스케줄 높이 체크
    useEffect(() => {
        const checkHeight = () => {
            if (mobileScheduleRef.current && window.innerWidth < 1240) {
                const height = mobileScheduleRef.current.scrollHeight;
                setShowExpandButton(height > 408);
            }
        };

        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, []);

    // 펼치기/접기 애니메이션
    useEffect(() => {
        if (mobileScheduleRef.current) {
            if (isExpanded) {
                setMaxHeight(mobileScheduleRef.current.scrollHeight);
            } else {
                setMaxHeight(408);
            }
        }
    }, [isExpanded]);

    return (
        <section
            id="schedule"
            className="bg-bg py-20">
            <Container className="py-0 flex flex-col gap-8 xl:gap-24">
                <img
                    className="hidden xl:block"
                    src={title}
                    width={'100%'}
                    height={'auto'}
                    alt="스케줄"
                />
                <img
                    className="xl:hidden block"
                    src={titleSm}
                    width={'100%'}
                    height={'auto'}
                    alt="스케줄"
                />

                {/* 데스크톱: 테이블 레이아웃 */}
                <div className="hidden xl:block overflow-x-auto">
                    <table
                        ref={gridRef}
                        className="w-full min-w-[980px] rounded-2xl border border-brand-stroke bg-black/20">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3"></th>
                                {SCHEDULE_TRACKS.map((track) => (
                                    <ScheduleTrackHeader
                                        key={track.id}
                                        track={track}
                                    />
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {SCHEDULE_ROWS.map((row) => (
                                <ScheduleRow
                                    key={row.time}
                                    row={row}
                                    onSessionHover={handleSessionHover}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 모바일: 세로 스택 레이아웃 */}
                <div className="xl:hidden relative">
                    {/* 모바일 트랙 헤더 */}
                    <div className="flex gap-4 mb-4 px-5">
                        {SCHEDULE_TRACKS.map((track) => {
                            const borderColor = (() => {
                                if (track.id === 'track1') return '#703FFF';
                                if (track.id === 'track2') return '#FF9900';
                                return '#FFFFFF';
                            })();

                            return (
                                <div
                                    key={track.id}
                                    className="flex-1 flex items-center justify-center h-11 pl-6"
                                    style={{ borderLeft: `4px solid ${borderColor}` }}>
                                    <p className="text-fancy-subtitle1 text-white">
                                        {track.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        ref={mobileScheduleRef}
                        className="flex flex-col w-full overflow-hidden"
                        style={{
                            maxHeight: showExpandButton ? `${maxHeight}px` : 'none',
                            transition: 'max-height 0.5s ease-in-out',
                        }}>
                        {SCHEDULE_ROWS.map((row) => {
                            // full 타입 (전체 행)
                            if ('full' in row) {
                                const bgColor = (() => {
                                    if (row.full.tone === 'muted') return 'rgba(255,255,255,0.1)';
                                    if (row.full.tone === 'break')
                                        return 'rgba(255,255,255,0.05)';
                                    if (row.full.tone === 'brand') return 'rgba(112,63,255,0.2)';
                                    return undefined;
                                })();

                                return (
                                    <div
                                        key={row.time}
                                        className="flex items-start w-full border-b border-brand-stroke last:border-b-0">
                                        {/* 시간 */}
                                        <div className="flex items-center justify-center py-3 w-[120px] shrink-0">
                                            <p className="text-body1 text-white whitespace-nowrap">
                                                {row.time}
                                            </p>
                                        </div>

                                        {/* 전체 세션 */}
                                        <div
                                            className={
                                                row.full.speakerId && row.full.description
                                                    ? 'flex-1 flex items-center justify-center py-5 px-4 cursor-pointer hover:opacity-80 transition-opacity'
                                                    : 'flex-1 flex items-center justify-center py-5 px-4'
                                            }
                                            style={{ backgroundColor: bgColor }}
                                            onClick={(e) => {
                                                if (row.full.speakerId && row.full.description) {
                                                    const speaker = getSpeakerById(row.full.speakerId);
                                                    if (speaker) {
                                                        handleSessionHover(
                                                            {
                                                                title: row.full.title,
                                                                description: row.full.description,
                                                                speaker,
                                                            },
                                                            e as any
                                                        );
                                                    }
                                                }
                                            }}>
                                            {row.full.speakerId ? (
                                                (() => {
                                                    const speaker = getSpeakerById(row.full.speakerId);
                                                    if (!speaker) return null;

                                                    return (
                                                        <div className="flex flex-col gap-1 w-full">
                                                            <p className="text-body1 text-white">
                                                                {row.full.title}
                                                            </p>
                                                            <p className="text-[12px] leading-[20px] text-white/70">
                                                                {speaker.name} · {speaker.org}
                                                            </p>
                                                        </div>
                                                    );
                                                })()
                                            ) : (
                                                <p className="text-title2 text-white text-center">
                                                    {row.full.title}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            // cells 타입 (트랙별 세션)
                            return (
                                <div
                                    key={row.time}
                                    className="flex items-start w-full border-b border-brand-stroke last:border-b-0">
                                    {/* 시간 */}
                                    <div className="flex items-center justify-center py-3 w-[120px] shrink-0">
                                        <p className="text-body1 text-white whitespace-nowrap">
                                            {row.time}
                                        </p>
                                    </div>

                                    {/* 세션들 */}
                                    <div className="flex-1 flex flex-col">
                                        {SCHEDULE_TRACKS.map((track) => {
                                            const cell = row.cells[track.id];

                                            if (cell.kind === 'empty') return null;

                                            const bgColor = (() => {
                                                if (track.id === 'track1')
                                                    return 'rgba(112,63,255,0.2)';
                                                if (track.id === 'track2') return 'rgba(255,153,0,0.2)';
                                                return 'rgba(255,255,255,0.2)';
                                            })();

                                            if (cell.kind === 'session') {
                                                const speaker = getSpeakerById(cell.speakerId);
                                                if (!speaker) return null;

                                                const hasDescription =
                                                    cell.description && cell.description.trim().length > 0;

                                                return (
                                                    <div
                                                        key={track.id}
                                                        className={
                                                            hasDescription
                                                                ? 'flex items-center justify-center py-3 px-4 border-b border-brand-stroke last:border-b-0 cursor-pointer hover:opacity-80 transition-opacity'
                                                                : 'flex items-center justify-center py-3 px-4 border-b border-brand-stroke last:border-b-0'
                                                        }
                                                        style={{ backgroundColor: bgColor }}
                                                        onClick={(e) => {
                                                            if (hasDescription) {
                                                                handleSessionHover(
                                                                    {
                                                                        title: cell.title,
                                                                        description: cell.description,
                                                                        speaker,
                                                                    },
                                                                    e as any
                                                                );
                                                            }
                                                        }}>
                                                        <div className="flex flex-col gap-1 w-full">
                                                            <p className="text-body1 text-white">
                                                                {cell.title}
                                                            </p>
                                                            <p className="text-[12px] leading-[20px] text-white">
                                                                {speaker.name} · {speaker.org}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div
                                                    key={track.id}
                                                    className="flex items-center justify-center py-3 px-4 border-b border-brand-stroke last:border-b-0"
                                                    style={{ backgroundColor: bgColor }}>
                                                    <p className="text-body1 text-white text-center">
                                                        {cell.title}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 그라데이션 오버레이 */}
                    {showExpandButton && !isExpanded && (
                        <div
                            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                            style={{
                                background:
                                    'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)',
                            }}
                        />
                    )}

                    {/* 펼쳐보기 버튼 */}
                    {showExpandButton && (
                        <div className="pt-8 px-5">
                            <button
                                type="button"
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="w-full px-[14px] py-[10px] bg-[rgba(255,153,0,0.6)] rounded-2xl backdrop-blur-[5px] transition-colors hover:bg-[rgba(255,153,0,0.8)]">
                                <span className="text-body1 text-white">
                                    {isExpanded ? '접기' : '펼쳐보기'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </Container>

            {/* Session Modal */}
            <SessionModal
                isOpen={modalData.isOpen}
                onClose={() => setModalData((prev) => ({ ...prev, isOpen: false }))}
                title={modalData.title}
                speaker={modalData.speaker}
                description={modalData.description}
                position={modalData.position}
            />
        </section>
    );
}
