import {
    type ScheduleCell,
    type ScheduleTrackId,
    getSpeakerById,
} from '@/constants/schedule';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

const TRACK_CELL_STYLES: Record<
    ScheduleTrackId,
    { label: string; session: string; tint: string }
> = {
    track1: {
        label:
            'text-title bg-[var(--opacity-w020)] text-white text-center max-w-[386.667px]',
        session: 'bg-[var(--opacity-p020)] max-w-[386.667px]',
        tint: 'text-brand-primary text-white max-w-[386.667px]',
    },
    track2: {
        label:
            'text-title1  bg-[var(--opacity-w020)]  text-white text-center max-w-[386.667px]',
        session: 'bg-[var(--opacity-s020)] text-white  max-w-[386.667px]',
        tint: 'text-brand-secondary max-w-[386.667px] text-start',
    },
    track3: {
        label: 'text-title1 bg-[var(--opacity-w020)] text-white  max-w-[386.667px]',
        session: 'bg-white/6 max-w-[386.667px]',
        tint: 'text-white/70 max-w-[386.667px]',
    },
};

interface ScheduleCellProps {
    trackId: ScheduleTrackId;
    cell: ScheduleCell;
    onSessionHover?: (
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
    ) => void;
}

export function ScheduleCell({ trackId, cell, onSessionHover }: ScheduleCellProps) {
    const styles = TRACK_CELL_STYLES[trackId];
    const cellRef = useRef<HTMLTableCellElement>(null);

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

    const speaker = getSpeakerById(cell.speakerId);
    if (!speaker) return null;

    const hasDescription = cell.description && cell.description.trim().length > 0;

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (hasDescription && onSessionHover) {
            onSessionHover(
                {
                    title: cell.title,
                    description: cell.description,
                    speaker,
                },
                e
            );
        }
    };

    const handleMouseLeave = () => {
        if (hasDescription && onSessionHover) {
            onSessionHover(null);
        }
    };

    return (
        <td
            ref={cellRef}
            className={cn(
                'py-4 px-4 min-h-20',
                styles.session,
                hasDescription && 'cursor-pointer hover:opacity-80 transition-opacity'
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className={'flex items-center justify-between'}>
                <ul className="min-w-0 flex flex-col gap-1">
                    <li className="text-title2 text-white pr-2">{cell.title}</li>
                    <li className={cn('text-body1', styles.tint)}>
                        {speaker.name} · {speaker.org}
                    </li>
                </ul>
                <img
                    width={64}
                    height={64}
                    src={speaker.profileImage}
                    alt={`${speaker.name} 프로필`}
                    className="object-cover w-16 h-16 shrink-0"
                    loading="lazy"
                />
            </div>
        </td>
    );
}
