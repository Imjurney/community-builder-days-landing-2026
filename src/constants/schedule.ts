import sonu_kim_sl from "@/assets/spearker/sonu_kim_sl.jpg";

export type ScheduleTrackId = "track1" | "track2" | "track3";

export const SCHEDULE_TRACKS: Array<{ id: ScheduleTrackId; label: string }> = [
  { id: "track1", label: "Track 1" },
  { id: "track2", label: "Track 2" },
  { id: "track3", label: "Track 3" },
];

export type ScheduleCell =
  | {
      kind: "session";
      title: string;
      speaker?: string;
      org?: string;
      avatarSrc?: string;
    }
  | { kind: "label"; title: string }
  | { kind: "empty" };

export type ScheduleRow =
  | {
      time: string;
      full: {
        title: string;
        tone?: "muted" | "brand" | "break";
      };
    }
  | {
      time: string;
      cells: Record<ScheduleTrackId, ScheduleCell>;
    };

export const SCHEDULE_ROWS: ScheduleRow[] = [
  {
    time: "10:00 - 10:30",
    full: { title: "입장 및 등록", tone: "muted" },
  },
  {
    time: "10:30 - 10:50",
    cells: {
      track1: { kind: "label", title: "소개 및 기조 연설" },
      track2: { kind: "label", title: "소개 및 기조 연설" },
      track3: { kind: "label", title: "소개 및 기조 연설" },
    },
  },
  {
    time: "10:50 - 11:30",
    full: { title: "휴식", tone: "break" },
  },
  {
    time: "11:30 - 12:10",
    cells: {
      track1: {
        kind: "session",
        title: "글로벌 4개국 AWS 커뮤니티 발표 후기 경험과 노하우",
        speaker: "김선우",
        org: "Serverless CB",
        avatarSrc: sonu_kim_sl,
      },
      track2: {
        kind: "session",
        title: "경험에서 끝내지 않기",
        speaker: "김병호",
        org: "Company B",
      },
      track3: {
        kind: "session",
        title: "경험에서 끝내지 않기",
        speaker: "김병호",
        org: "Company C",
      },
    },
  },
  {
    time: "12:10 - 13:20",
    full: { title: "점심", tone: "break" },
  },
  {
    time: "13:20 - 14:00",
    cells: {
      track1: {
        kind: "session",
        title: "세션 2",
        speaker: "김병호",
        org: "Company D",
      },
      track2: {
        kind: "session",
        title: "워크숍: 운영 템플릿 만들기",
        speaker: "김병호",
        org: "Company E",
      },
      track3: { kind: "empty" },
    },
  },
  {
    time: "14:00 - 14:40",
    cells: {
      track1: { kind: "label", title: "키즈 세션" },
      track2: { kind: "label", title: "키즈 세션" },
      track3: { kind: "empty" },
    },
  },
  {
    time: "14:40 - 15:00",
    full: { title: "휴식", tone: "break" },
  },
  {
    time: "15:00 - 16:10",
    cells: {
      track1: { kind: "label", title: "마무리" },
      track2: { kind: "label", title: "마무리" },
      track3: { kind: "label", title: "마무리" },
    },
  },
];
