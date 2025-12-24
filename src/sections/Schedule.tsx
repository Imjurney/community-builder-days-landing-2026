import Container from "@/components/Container";
import { SCHEDULE_ROWS, SCHEDULE_TRACKS, type ScheduleCell, type ScheduleTrackId } from "@/constants/schedule";
import { useFadeIn, useSlideUp } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const TRACK_CELL_STYLES: Record<ScheduleTrackId, { label: string; session: string; tint: string }> =
  {
    track1: {
      label: "bg-brand-primary/20 text-fg",
      session: "bg-gradient-to-r from-brand-primary/30 via-brand-primary/15 to-white/5",
      tint: "text-brand-primary",
    },
    track2: {
      label: "bg-brand-secondary/20 text-fg",
      session: "bg-gradient-to-r from-brand-secondary/25 via-brand-secondary/10 to-white/5",
      tint: "text-brand-secondary",
    },
    track3: {
      label: "bg-white/6 text-fg",
      session: "bg-white/6",
      tint: "text-white/70",
    },
  };

function ScheduleGridCell({ trackId, cell }: { trackId: ScheduleTrackId; cell: ScheduleCell }) {
  const styles = TRACK_CELL_STYLES[trackId];

  if (cell.kind === "empty") {
    return (
      <div className="min-h-16 px-4 py-4" aria-hidden="true">
        <div className="h-full w-full rounded-xl border border-dashed border-brand-stroke/60 bg-white/0" />
      </div>
    );
  }

  if (cell.kind === "label") {
    return (
      <div className="min-h-16 px-4 py-4">
        <div
          className={cn(
            "flex h-full min-h-12 items-center justify-center rounded-xl border border-brand-stroke/60 px-4 text-center text-sm font-semibold",
            styles.label,
          )}
        >
          {cell.title}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-20 px-4 py-4">
      <div
        className={cn(
          "group flex h-full min-h-14 items-center justify-between gap-4 rounded-xl border border-brand-stroke/60 p-4 transition-colors",
          styles.session,
        )}
      >
        <div className="min-w-0">
          {cell.speaker ? (
            <div className={cn("text-xs font-medium", styles.tint)}>
              {cell.speaker}
              {cell.org ? <span className="text-white/60"> · {cell.org}</span> : null}
            </div>
          ) : null}
          <div className="mt-1 text-sm font-semibold leading-snug text-white line-clamp-2">
            {cell.title}
          </div>
        </div>
        {cell.avatarSrc ? (
          <img
            src={cell.avatarSrc}
            alt=""
            className="h-10 w-10 shrink-0 rounded-xl border border-white/10 object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/5" />
        )}
      </div>
    </div>
  );
}

export default function Schedule() {
  const titleRef = useSlideUp<HTMLHeadingElement>({
    duration: 1,
    delay: 0.2,
  });

  const gridRef = useFadeIn<HTMLDivElement>({
    duration: 0.8,
    delay: 0.35,
  });

  return (
    <section id="schedule" className="bg-bg py-20 border-t border-b border-brand-stroke">
      <Container className="py-0">
        {/* 섹션 제목 */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-fancy-large-title2 text-white mb-4"
          >
            Schedule
          </h2>
          <p className="text-body1 text-muted-fg max-w-2xl mx-auto">
            하루를 알차게 구성된 세션과 워크숍, 그리고 충분한 네트워킹 시간을
            확인해보세요.
          </p>
        </div>

        {/* 스케줄 그리드 */}
        <div ref={gridRef} className="mx-auto max-w-[1200px]">
          <div className="overflow-x-auto">
            <div className="min-w-[980px] rounded-2xl border border-brand-stroke bg-black/20">
              <div
                className="grid"
                style={{
                  gridTemplateColumns:
                    "minmax(110px, 130px) repeat(3, minmax(240px, 1fr))",
                }}
              >
                {/* 헤더 */}
                <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/60" />
                {SCHEDULE_TRACKS.map((track) => (
                  <div
                    key={track.id}
                    className="border-l border-brand-stroke bg-black/35 px-4 py-3 text-center text-xs font-semibold text-white/80"
                  >
                    {track.label}
                  </div>
                ))}

                {/* 바디 */}
                {SCHEDULE_ROWS.map((row) => {
                  const rowKey = row.time + ("full" in row ? row.full.title : "cells");
                  return (
                    <div key={rowKey} className="contents">
                      <div className="border-t border-brand-stroke px-4 py-4 text-xs font-medium text-white/60">
                        {row.time}
                      </div>

                      {"full" in row ? (
                        <div className="col-span-3 border-l border-t border-brand-stroke">
                          <div className="px-4 py-4">
                            <div
                              className={cn(
                                "flex min-h-16 items-center justify-center rounded-xl border border-brand-stroke/60 px-4 text-sm font-semibold",
                                row.full.tone === "break"
                                  ? "bg-black/45 text-white/80"
                                  : row.full.tone === "brand"
                                    ? "bg-brand-primary/18 text-white"
                                    : "bg-white/6 text-white/80",
                              )}
                            >
                              {row.full.title}
                            </div>
                          </div>
                        </div>
                      ) : (
                        SCHEDULE_TRACKS.map((track) => (
                          <div
                            key={`${row.time}-${track.id}`}
                            className="border-l border-t border-brand-stroke"
                          >
                            <ScheduleGridCell trackId={track.id} cell={row.cells[track.id]} />
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-white/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm text-muted-fg">
              모든 시간은 한국 표준시(KST) 기준입니다
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
