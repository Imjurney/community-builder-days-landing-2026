# Community Builder Days 2026

커뮤니티 행사를 위한 정적 랜딩 페이지 템플릿입니다. 모든 콘텐츠 데이터는 `src/constants/`에서 중앙 관리되어 쉽게 커스터마이징할 수 있습니다.

## 주요 기능

### 반응형 디자인

- **브레이크포인트**: 1240px (`xl:` 프리픽스)
- **모바일**: max-width 430px (중앙 정렬)
- **데스크톱**: max-width 1440px
- 모든 섹션이 모바일/데스크톱에 최적화

### 데이터 중앙 관리

- 스피커 정보는 ID로 참조하여 중복 제거
- 행사 정보, 스케줄, FAQ 등 모든 데이터 분리
- 타입 안정성으로 데이터 일관성 보장

### 주요 섹션

- Hero - 행사 메인 정보 및 CTA
- Overview - 행사 하이라이트
- Speakers - 연사 소개 (캐러셀)
- Schedule - 시간표 (데스크톱: 테이블, 모바일: 세로 스택)
- Venue - 장소 안내
- FAQ - 자주 묻는 질문
- Sponsors - 후원사

## 📁 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Countdown.tsx
│   └── ...
├── sections/         # 페이지 섹션 컴포넌트
│   ├── Hero.tsx
│   ├── Speakers.tsx
│   ├── Schedule.tsx
│   └── ...
├── constants/        # 데이터 관리 (중요!)
│   ├── event.ts      # 행사 기본 정보, Hero 데이터
│   ├── speakers.ts   # 연사 정보
│   ├── schedule.ts   # 스케줄 데이터
│   ├── faq.ts        # FAQ 데이터
│   └── ...
├── types/            # TypeScript 타입 정의
├── lib/              # 유틸리티 함수
│   ├── utils.ts      # cn() - clsx + tailwind-merge
│   └── gsap.ts       # GSAP 애니메이션 hooks
└── styles/           # 글로벌 CSS 및 Tailwind 설정
```

## 🚀 시작하기

### 요구 사항

- Node.js 18+
- pnpm (권장) 또는 npm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:5173)
pnpm dev

# 타입 체크
pnpm typecheck

# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

## 📝 데이터 관리 가이드

### 1. 행사 기본 정보 수정

`src/constants/event.ts`에서 행사 정보를 수정합니다.

```typescript
export const EVENT: EventInfo = {
  name: 'Community Builder Days 2025',
  startAt: '2026-01-24T00:00:00+09:00',
  registerUrl: 'https://example.com/register',
  hero: {
    title: {
      line1: 'AWS community',
      line2: 'builders day KOREA',
    },
    dateTime: '2026.01.24 (Sat)',
    location: 'CENTER FIELD, 18F, Seoul',
    ctaText: '참가하러 가기',
  },
};
```

### 2. 스피커 추가/수정

`src/constants/speakers.ts`에서 스피커를 관리합니다.

```typescript
export const SPEAKERS: Speaker[] = [
  {
    id: 'speaker-1', // 고유 ID (스케줄에서 참조)
    name: '홍길동',
    org: 'AWS Community',
    bio: '소개...',
    profileImage: speaker_image,
  },
];
```

### 3. 스케줄 관리

`src/constants/schedule.ts`에서 스케줄을 관리합니다.

**중요**: 스피커는 ID로 참조하여 데이터 일관성을 유지합니다.

```typescript
export const SCHEDULE_ROWS: ScheduleRow[] = [
  {
    time: '14:00 ~ 14:30',
    cells: {
      track1: {
        kind: 'session',
        title: '세션 제목',
        speakerId: 'speaker-1', // speakers.ts의 ID 참조
      },
      track2: { kind: 'empty' },
      track3: { kind: 'empty' },
    },
  },
];
```

스피커 정보(이름, 소속, 이미지)는 자동으로 `speakers.ts`에서 가져옵니다.

### 4. FAQ 수정

`src/constants/faq.ts`에서 FAQ를 관리합니다.

### 5. 네비게이션 수정

`src/constants/navigation.ts`에서 메뉴 항목을 관리합니다.

## 🎨 스타일링

### Tailwind CSS 4

- CSS 변수 기반 디자인 토큰 (`--primary`, `--bg`, `--fg` 등)
- `cn()` 유틸리티로 조건부 클래스 병합
- 커스텀 반응형 클래스: `hero-title`, `hero-time`, `speaker-bio` 등

### 반응형 브레이크포인트

```css
/* 모바일 우선 */
.class {
  /* < 1240px */
}

/* 데스크톱 */
@media (min-width: 1240px) {
  .xl\:class {
    /* >= 1240px */
  }
}
```

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# dist/ 폴더가 생성됩니다

```

## 🔧 커스터마이징 체크리스트

- [ ] `src/constants/event.ts` - 행사 정보 수정
- [ ] `src/constants/speakers.ts` - 연사 추가
- [ ] `src/constants/schedule.ts` - 스케줄 작성
- [ ] `src/constants/faq.ts` - FAQ 작성
- [ ] `public/favicon.png` - 파비콘 교체
- [ ] `index.html` - 메타 태그 수정
- [ ] `public/mainBackground.svg` - 배경 이미지 교체 (선택)

## 📄 라이선스

MIT License
