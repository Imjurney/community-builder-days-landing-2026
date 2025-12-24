import sonu_kim_sl from '@/assets/spearker/sonu_kim_sl.jpg';

export type ScheduleTrackId = 'track1' | 'track2' | 'track3';

export const SCHEDULE_TRACKS: Array<{
  id: ScheduleTrackId;
  label: string;
  bottomColor: string;
}> = [
  { id: 'track1', label: 'Track 1', bottomColor: 'bg-[var(--track-1)]' },
  { id: 'track2', label: 'Track 2', bottomColor: 'bg-[var(--track-2)]' },
  { id: 'track3', label: 'Track 3', bottomColor: 'bg-[var(--track-3)]' },
];

export type ScheduleCell =
  | {
      kind: 'session';
      title: string;
      speaker?: string;
      org?: string;
      avatarSrc?: string;
    }
  | { kind: 'label'; title: string }
  | { kind: 'empty' };

export type ScheduleRow =
  | {
      time: string;
      full: {
        title: string;
        tone?: 'muted' | 'brand' | 'break';
      };
    }
  | {
      time: string;
      cells: Record<ScheduleTrackId, ScheduleCell>;
    };

export const SCHEDULE_ROWS: ScheduleRow[] = [
  {
    time: '12:30 ~ 13:00',
    full: { title: '입장 및 등록', tone: 'muted' },
  },
  {
    time: '13:30 ~ 13:50',
    cells: {
      track1: { kind: 'label', title: '소개 및 기조 연설' },
      track2: { kind: 'label', title: '소개 및 기조 연설' },
      track3: { kind: 'label', title: '소개 및 기조 연설' },
    },
  },
  {
    time: '13:50 ~ 14:00',
    full: { title: '휴식', tone: 'break' },
  },
  {
    time: '14:10 ~ 14:40',
    cells: {
      track1: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김선우',
        org: 'Serverless CB',
        avatarSrc: sonu_kim_sl,
      },
      track2: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김병호',
        org: 'Company B',
      },
      track3: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김병호',
        org: 'Company C',
      },
    },
  },
  {
    time: '14:40 ~ 14:50',
    full: { title: '휴식', tone: 'break' },
  },
  {
    time: '14:50 ~ 15:20',
    cells: {
      track1: {
        kind: 'session',
        title: '세션 2',
        speaker: '김병호',
        org: 'Company D',
      },
      track2: {
        kind: 'session',
        title: '워크숍: 운영 템플릿 만들기',
        speaker: '김병호',
        org: 'Company E',
      },
      track3: { kind: 'empty' },
    },
  },

  {
    time: '15:20 ~ 16:00',
    full: {
      title: '긴 휴식 : 간식 및 부스',
      tone: 'break',
    },
  },
  {
    time: '16:00 ~ 16:30',
    cells: {
      track1: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김선우',
        org: 'Serverless CB',
        avatarSrc: sonu_kim_sl,
      },
      track2: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김병호',
        org: 'Company B',
      },
      track3: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김병호',
        org: 'Company C',
      },
    },
  },
  {
    time: '16:30 ~ 16:40',
    full: { title: '휴식', tone: 'break' },
  },
  {
    time: '16:40 ~ 17:10',
    cells: {
      track1: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김선우',
        org: 'Serverless CB',
        avatarSrc: sonu_kim_sl,
      },
      track2: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김병호',
        org: 'Company B',
      },
      track3: {
        kind: 'session',
        title: '경험에서 끝내지 않기',
        speaker: '김병호',
        org: 'Company C',
      },
    },
  },

  {
    time: '17:10 ~ 17:40',
    cells: {
      track1: { kind: 'label', title: '퀴즈 세션' },
      track2: { kind: 'label', title: '퀴즈 세션' },
      track3: { kind: 'label', title: '퀴즈 세션' },
    },
  },
  {
    time: '17:40 ~ 18:00',
    cells: {
      track1: { kind: 'label', title: '마무리' },
      track2: { kind: 'label', title: '마무리' },
      track3: { kind: 'label', title: '마무리' },
    },
  },
];
