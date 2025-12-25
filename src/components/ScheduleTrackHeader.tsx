import { SCHEDULE_TRACKS } from '@/constants/schedule';
import { cn } from '@/lib/utils';

interface ScheduleTrackHeaderProps {
  track: (typeof SCHEDULE_TRACKS)[0];
}

export const ScheduleTrackHeader = ({ track }: ScheduleTrackHeaderProps) => {
  return (
    <th
      scope="col"
      className="text-fancy-title1 relative text-white pb-6">
      {track.label}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg',
          track.bottomColor
        )}
      />
    </th>
  );
};
