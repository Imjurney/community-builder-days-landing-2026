import { ScheduleCell } from '@/components/ScheduleCell';
import {
  SCHEDULE_TRACKS,
  type ScheduleRow as ScheduleRowType,
  getSpeakerById,
} from '@/constants/schedule';

interface ScheduleRowProps {
  row: ScheduleRowType;
}

export function ScheduleRow({ row }: ScheduleRowProps) {
  const isFullRow = 'full' in row;
  const rowKey = row.time + (isFullRow ? row.full.title : 'cells');

  const getBgColor = () => {
    if (!isFullRow) return undefined;

    if (row.full.tone === 'muted') return 'rgba(255,255,255,0.1)';
    if (row.full.tone === 'break') return 'rgba(255,255,255,0.05)';
    if (row.full.tone === 'brand') return 'rgba(112,63,255,0.2)';
    return undefined;
  };

  return (
    <tr
      className="w-[216px]"
      key={rowKey}>
      <td className="text-body1 py-10 text-center text-white">{row.time}</td>
      {isFullRow ? (
        <td
          colSpan={3}
          className="py-[34px] text-white"
          style={{ backgroundColor: getBgColor() }}>
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
          />
        ))
      )}
    </tr>
  );
}
