import Container from '@/components/Container';
import { ScheduleRow } from '@/components/ScheduleRow';
import { ScheduleTrackHeader } from '@/components/ScheduleTrackHeader';
import { SCHEDULE_ROWS, SCHEDULE_TRACKS } from '@/constants/schedule';
import { useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section2.svg';

export default function Schedule() {
  const gridRef = useFadeIn<HTMLTableElement>({
    duration: 0.8,
    delay: 0.35,
  });

  return (
    <section
      id="schedule"
      className="bg-bg py-20">
      <Container className="py-0 flex flex-col gap-24">
        <img
          src={title}
          width={'100%'}
          height={'auto'}
          alt="스케줄"
        />

        <div className="overflow-x-auto">
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
      </Container>
    </section>
  );
}
