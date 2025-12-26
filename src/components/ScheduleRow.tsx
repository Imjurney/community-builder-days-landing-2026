import { ScheduleCell } from "@/components/ScheduleCell";
import {
  SCHEDULE_TRACKS,
  type ScheduleRow as ScheduleRowType,
  getSpeakerById,
} from "@/constants/schedule";

interface ScheduleRowProps {
  row: ScheduleRowType;
  onSessionHover?: (
    session: {
      title: string;
      description?: string;
      speaker: {
        name: string;
        org: string;
        profileImage: string;
      };
      trackId?: string;
    } | null,
    event?: React.MouseEvent
  ) => void;
}

export function ScheduleRow({ row, onSessionHover }: ScheduleRowProps) {
  const isFullRow = "full" in row;
  const rowKey = row.time + (isFullRow ? row.full.title : "cells");

  const getBgColor = () => {
    if (!isFullRow) return undefined;

    if (row.full.tone === "muted") return "rgba(255,255,255,0.1)";
    if (row.full.tone === "break") return "rgba(255,255,255,0.05)";
    if (row.full.tone === "brand") return "rgba(112,63,255,0.2)";
    return undefined;
  };

  const hasFullRowDescription =
    isFullRow &&
    row.full.description &&
    row.full.description.trim().length > 0 &&
    row.full.speakerId;

  const handleFullRowMouseEnter = (e: React.MouseEvent) => {
    if (hasFullRowDescription && isFullRow && row.full.speakerId) {
      const speaker = getSpeakerById(row.full.speakerId);
      if (speaker && onSessionHover) {
        onSessionHover(
          {
            title: row.full.title,
            description: row.full.description,
            speaker,
          },
          e
        );
      }
    }
  };

  const handleFullRowMouseLeave = () => {
    if (hasFullRowDescription && onSessionHover) {
      onSessionHover(null);
    }
  };

  return (
    <tr className="w-[216px]" key={rowKey}>
      <td className="text-body1 py-10 text-center text-white">{row.time}</td>
      {isFullRow ? (
        <td
          colSpan={3}
          className={
            hasFullRowDescription
              ? "py-[34px] text-white cursor-pointer hover:opacity-80 transition-opacity"
              : "py-[34px] text-white"
          }
          style={{ backgroundColor: getBgColor() }}
          onMouseEnter={handleFullRowMouseEnter}
          onMouseLeave={handleFullRowMouseLeave}
        >
          {row.full.speakerId ? (
            (() => {
              const speaker = getSpeakerById(row.full.speakerId);
              if (!speaker) return null;

              return (
                <div className="flex items-center justify-center px-4">
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex-1 flex flex-col gap-1 text-left min-w-0">
                      <p className="text-title1">{row.full.title}</p>
                      <p className="text-body1 text-white/70">
                        {speaker.name} · {speaker.org}
                      </p>
                    </div>
                    <img
                      width={64}
                      height={64}
                      src={speaker.profileImage}
                      alt={`${speaker.name} 프로필`}
                      className="object-cover shrink-0 w-16 h-16 ml-4"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })()
          ) : (
            <p className="text-title1 text-center">{row.full.title}</p>
          )}
        </td>
      ) : (
        SCHEDULE_TRACKS.map((track) => (
          <ScheduleCell
            key={`${row.time}-${track.id}`}
            trackId={track.id}
            cell={row.cells[track.id]}
            onSessionHover={onSessionHover}
          />
        ))
      )}
    </tr>
  );
}
