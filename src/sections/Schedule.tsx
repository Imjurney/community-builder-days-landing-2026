import Container from '@/components/Container';
import { ScheduleRow } from '@/components/ScheduleRow';
import { ScheduleTrackHeader } from '@/components/ScheduleTrackHeader';
import { SCHEDULE_ROWS, SCHEDULE_TRACKS } from '@/constants/schedule';
import { useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section2.svg';
import titleSm from '@/assets/sectionTitle/title_section2_sm.svg';
import { useState, useRef, useEffect } from 'react';

export default function Schedule() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const mobileScheduleRef = useRef<HTMLDivElement>(null);

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
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* 모바일: 세로 스택 레이아웃 */}
        <div className="xl:hidden relative">
          <div
            ref={mobileScheduleRef}
            className="flex flex-col w-full overflow-hidden transition-all duration-300"
            style={{
              maxHeight: !isExpanded && showExpandButton ? '408px' : 'none',
            }}>
            {SCHEDULE_ROWS.map((row) => {
              // full 타입 (전체 행)
              if ('full' in row) {
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
                    <div className="flex-1 flex items-center justify-center py-5 px-4">
                      <p className="text-title2 text-white text-center">
                        {row.full.title}
                      </p>
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

                      return (
                        <div
                          key={track.id}
                          className="flex items-center justify-center py-3 px-4 border-b border-brand-stroke last:border-b-0"
                          style={{ backgroundColor: bgColor }}>
                          {cell.kind === 'session' && cell.speaker ? (
                            <div className="flex flex-col gap-1 w-full">
                              <p className="text-body1 text-white">
                                {cell.title}
                              </p>
                              <p className="text-[12px] leading-[20px] text-white">
                                {cell.speaker}
                              </p>
                            </div>
                          ) : (
                            <p className="text-body1 text-white text-center">
                              {cell.title}
                            </p>
                          )}
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
    </section>
  );
}
