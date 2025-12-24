import { ScheduleCell } from '@/components/ScheduleCell';
import {
  SCHEDULE_TRACKS,
  type ScheduleRow as ScheduleRowType,
} from '@/constants/schedule';
import { cn, textBody1, textTitle1 } from '@/lib/utils';

interface ScheduleRowProps {
  row: ScheduleRowType;
}

export function ScheduleRow({ row }: ScheduleRowProps) {
  const isFullRow = 'full' in row;
  const rowKey = row.time + (isFullRow ? row.full.title : 'cells');

  return (
    <tr
      className="w-[216px]"
      key={rowKey}>
      <td className={textBody1('py-10 text-center text-white ')}>{row.time}</td>
      {isFullRow ? (
        <td
          colSpan={3}
          className={textTitle1('py-[34px] text-white text-center')}>
          {row.full.title}
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
