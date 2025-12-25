import { SPEAKERS } from './speakers';

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
      speakerId: string;
    }
  | { kind: 'label'; title: string }
  | { kind: 'empty' };

export type ScheduleRow =
  | {
      time: string;
      full: {
        title: string;
        tone?: 'muted' | 'brand' | 'break';
        speakerId?: string;
      };
    }
  | {
      time: string;
      cells: Record<ScheduleTrackId, ScheduleCell>;
    };

// Helper function to get speaker by ID
export function getSpeakerById(speakerId: string) {
  return SPEAKERS.find((speaker) => speaker.id === speakerId);
}

export const SCHEDULE_ROWS: ScheduleRow[] = [
  {
    time: '12:30 ~ 13:00',
    full: { title: '입장 및 등록' },
  },
  {
    time: '13:30 ~ 13:50',
    full: {
      title: '소개 및 기조 연설 - 우리는 왜 커뮤니티에 남는가',
      tone: 'muted',
      speakerId: 'speaker-4',
    },
  },
  {
    time: '13:50 ~ 14:00',
    full: { title: '휴식' },
  },
  {
    time: '14:10 ~ 14:40',
    cells: {
      track1: {
        kind: 'session',
        title: '있다가 없으면 아쉬운 AWS',
        speakerId: 'speaker-13',
      },
      track2: {
        kind: 'session',
        title:
          'OpenSearch 를 사용한 유사 데이터 검색 및 매칭 시스템 구현 방법 소개',
        speakerId: 'speaker-5',
      },
      track3: {
        kind: 'session',
        title:
          'Hero 리인벤트 Recap: 신재현 : DevOps Agent, Security Agent + RDS Savings Paln',
        speakerId: 'speaker-3',
      },
    },
  },
  {
    time: '14:40 ~ 14:50',
    full: { title: '휴식' },
  },
  {
    time: '14:50 ~ 15:20',
    cells: {
      track1: {
        kind: 'session',
        title: 'Amazon Bedrock으로 알아보는 강화학습 기반 파인튜닝',
        speakerId: 'speaker-11',
      },
      track2: {
        kind: 'session',
        title: 'Operations as Code: AWS 환경을 자동화하는 우아한 방법',
        speakerId: 'speaker-6',
      },
      track3: {
        kind: 'session',
        title: 'Hero 리인벤트 Recap: Nova 2, Nova Forge + AI',
        speakerId: 'speaker-2',
      },
    },
  },
  {
    time: '15:20 ~ 16:00',
    full: {
      title: '긴 휴식 : 간식 및 부스',
    },
  },
  {
    time: '16:00 ~ 16:30',
    cells: {
      track1: {
        kind: 'session',
        title:
          'TPM에 대해 알려드립니다. (부제: TPM이 AWS Community를 활용한 방법)',
        speakerId: 'speaker-12',
      },
      track2: {
        kind: 'session',
        title: 'AWS CodeArtifact를 이용해 사내 패키지 레지스트리 만들기',
        speakerId: 'speaker-7',
      },
      track3: {
        kind: 'session',
        title: '오픈소스를 활용한 AWS 인프라 취약점 진단',
        speakerId: 'speaker-10',
      },
    },
  },
  {
    time: '16:30 ~ 16:40',
    full: { title: '휴식' },
  },
  {
    time: '16:40 ~ 17:10',
    cells: {
      track1: {
        kind: 'session',
        title:
          'Hero 리인벤트 recap: AWS Lambda Durable Function & Lambda Managed Instance',
        speakerId: 'speaker-1',
      },
      track2: {
        kind: 'session',
        title: 'AWS Kiro와 Q를 이용해 AWS 공부를 해보자!',
        speakerId: 'speaker-9',
      },
      track3: {
        kind: 'session',
        title: '초보자를 위한 Opensource 기반 LLM 모델 구축 방법',
        speakerId: 'speaker-8',
      },
    },
  },
  {
    time: '17:10 ~ 17:40',
    full: { title: '퀴즈 세션' },
  },
  {
    time: '17:40 ~ 18:00',
    full: { title: '마무리' },
  },
];
