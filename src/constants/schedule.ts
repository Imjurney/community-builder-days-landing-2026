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
    description?: string;
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
      description?: string;
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

// Helper function to get session titles by speaker ID
export function getSessionsBySpeakerId(speakerId: string): string[] {
  const sessions: string[] = [];

  SCHEDULE_ROWS.forEach((row) => {
    if ('full' in row) {
      // full 타입에서 스피커 확인
      if (row.full.speakerId === speakerId) {
        sessions.push(row.full.title);
      }
    } else {
      // cells 타입에서 스피커 확인
      Object.values(row.cells).forEach((cell) => {
        if (cell.kind === 'session' && cell.speakerId === speakerId) {
          sessions.push(cell.title);
        }
      });
    }
  });

  return sessions;
}

export const SCHEDULE_ROWS: ScheduleRow[] = [
  {
    time: '12:30 ~ 13:00',
    full: { title: '입장 및 등록' },
  },
  {
    time: '13:30 ~ 13:50',
    full: {
      title:
        '키노트 - 우리는 왜 커뮤니티에 남는가 \'EC2는 사람을 키우지 않는다\'',
      tone: 'muted',
      speakerId: 'speaker-4',
      description: 'AWS 커뮤니티에 참여하는 의미와 가치에 대한 키노트 세션입니다.',
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
        description: '4년간 AWS를 사용하다가 AWS가 없는 회사로 이직해서 겪은 일들을 기반으로 클라우드 인프라의 장점을 역설 해보고자 합니다.',
      },
      track2: {
        kind: 'session',
        title:
          'OpenSearch 를 사용한 유사 데이터 검색 및 매칭 시스템 구현 방법 소개',
        speakerId: 'speaker-5',
        description: 'OpenSearch의 유사도와 가중치를 활용한 검색의 기본을 살펴보고, 하이브리드 검색과 AI 기술을 접목하여 매칭 시스템을 구현했던 프로젝트 경험을 공유합니다. 또한 그 과정에서 마주한 기술적 과제와 이를 해결한 방법에 대해서도 함께 소개합니다.',
      },
      track3: {
        kind: 'session',
        title:
          'Hero 리인벤트 Recap: 신재현 : DevOps Agent, Security Agent + RDS Savings Paln',
        speakerId: 'speaker-3',
        description: 'AWS re:Invent에서 발표된 DevOps Agent, Security Agent 및 RDS Savings Plan에 대한 주요 내용과 실무 적용 방법을 소개합니다.',
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
        description: 'Amazon Bedrock도 이제는 강화학습 기반의 파인튜닝을 지원하기 시작했습니다. 이에, 기존의 SFT와 달리 강화학습이 각광받는 이유를 소개하고, 실제 Bedrock에서의 RFT 진행 과정을 함께 보는 시간을 가지고자 합니다.',
      },
      track2: {
        kind: 'session',
        title: 'Operations as Code: AWS 환경을 자동화하는 우아한 방법',
        speakerId: 'speaker-6',
        description: '클라우드 규모가 커질수록 수동 운영은 장애의 원인이 됩니다. SSM 핵심 기능을 통해 운영을 코드화(Code)하는 전략을 소개합니다. Hybrid Activation과 Fleet Manager로 IDC와 AWS의 경계를 허물어 통합 관리 환경을 구축하고, State Manager로 인프라의 일관성을 강제합니다. 여기에 Automation을 더해 CalendarOps와 같이 자동화된 워크플로우로 전환하는 법을 다룹니다.',
      },
      track3: {
        kind: 'session',
        title: 'Hero 리인벤트 Recap: Nova 2, Nova Forge + AI',
        speakerId: 'speaker-2',
        description: 'AWS re:Invent에서 발표된 Nova 2, Nova Forge 및 AI 관련 최신 기술과 서비스에 대한 심층 분석을 제공합니다.',
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
          'TPM에 대해 알려드립니다. (TPM이 AWS Community를 활용한 방법)',
        speakerId: 'speaker-12',
        description: '꽤 긴 시간 AWS를 지켜봐왔던 입장에서 비개발자 직군인 TPM으로 전향하며 어떻게 TPM으로 살아왔는지, TPM에 대한 소개와 AWS Community를 활용한 이야기를 가볍게 전해보고자 합니다.',
      },
      track2: {
        kind: 'session',
        title: 'AWS CodeArtifact를 이용해 사내 패키지 레지스트리 만들기',
        speakerId: 'speaker-7',
        description: 'AWS CodeArtifact를 사용하여 사내 패키지를 관리할 때 다양한 환경에서 패키지를 설치하고 빌드하는 과정은 불편한 편입니다. GitHub Actions, Docker를 사용하는 환경에서도 안전하고 편리하게 패키지를 설치, 배포할 수 있는 환경을 제공하기 위해 고려할 점에 대해 공유드립니다.',
      },
      track3: {
        kind: 'session',
        title: '오픈소스를 활용한 AWS 인프라 취약점 진단',
        speakerId: 'speaker-10',
        description: 'AWS 인프라 진단을 오픈소스를 활용하여 체크할 수 있는 방법에 대하여 공유합니다.',
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
        description: 'AWS re:Invent에서 발표된 Lambda Durable Function과 Lambda Managed Instance의 새로운 기능과 활용 사례를 공유합니다.',
      },
      track2: {
        kind: 'session',
        title: 'AWS Kiro와 Q를 이용해 AWS 공부를 해보자!',
        speakerId: 'speaker-9',
        description: 'AWS Amazon Q와 Kiro를 이용하여 학생들의 학습을 위한 가이드 개발을 어떻게 하였는지, 학습을 위한 플랫폼 개발을 어떻게 하였는지를 공유합니다.',
      },
      track3: {
        kind: 'session',
        title: '초보자를 위한 Opensource 기반 LLM 모델 구축 방법',
        speakerId: 'speaker-8',
        description: 'AI관련 경험이 거의 없는 Devops 엔지니어가 Opensource로 제공하는 LLM 모델을 AWS 환경에서 어떻게 구축하였는지 EC2또는 Bedrock 서비스를 기준의 Architecture 패턴을 각각 소개하고, 각 패턴별 특징을 공유합니다. (GPT-OSS 모델로 예시)',
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
