import { type ScheduleCell, type ScheduleTrackId } from '@/constants/schedule';
import { cn } from '@/lib/utils';

const TRACK_CELL_STYLES: Record<
  ScheduleTrackId,
  { label: string; session: string; tint: string }
> = {
  track1: {
    label:
      'text-title1 bg-[var(--opacity-p020)] text-white text-center max-w-[386.667px]',
    session: 'bg-[var(--opacity-p020)] max-w-[386.667px]',
    tint: 'text-brand-primary text-white max-w-[386.667px]',
  },
  track2: {
    label:
      'text-title1 bg-[var(--opacity-s020)] text-white text-center max-w-[386.667px]',
    session:
      'bg-[var(--opacity-s020)] text-white text-center max-w-[386.667px]',
    tint: 'text-brand-secondary max-w-[386.667px] text-start',
  },
  track3: {
    label:
      'text-title1 bg-[var(--opacity-w020)] text-white text-center max-w-[386.667px]',
    session: 'bg-white/6 max-w-[386.667px]',
    tint: 'text-white/70 max-w-[386.667px]',
  },
};

interface ScheduleCellProps {
  trackId: ScheduleTrackId;
  cell: ScheduleCell;
}

export function ScheduleCell({ trackId, cell }: ScheduleCellProps) {
  const styles = TRACK_CELL_STYLES[trackId];

  if (cell.kind === 'empty') {
    return (
      <td
        className="min-h-16 px-4 py-4"
        aria-hidden="true">
        <div className="h-full w-full rounded-xl border border-dashed border-brand-stroke/60"></div>
      </td>
    );
  }

  if (cell.kind === 'label') {
    return <td className={styles.label}>{cell.title}</td>;
  }

  return (
    <td className={cn('py-5 px-4 min-h-20', styles.session)}>
      <div className={'flex items-center justify-between'}>
        <ul className="min-w-0 flex flex-col gap-1">
          <li className="text-title2 text-white">{cell.title}</li>
          {cell.speaker && (
            <li className={cn('text-body1', styles.tint)}>{cell.speaker}</li>
          )}
        </ul>
        {cell.avatarSrc ? (
          <img
            width={64}
            height={64}
            src={cell.avatarSrc}
            alt={`${cell.speaker} 프로필`}
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-16 w-16 shrink-0 border border-white/10 bg-white/5"></div>
        )}
      </div>
    </td>
  );
}
